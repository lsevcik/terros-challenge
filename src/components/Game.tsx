import { useState, type Dispatch, type SetStateAction } from 'react'
import { type Color, type GameBoard, type Location, type Piece } from '../types'
import { Square } from './Square'

type Props = {
  gameState: GameBoard
  setGameState: Dispatch<SetStateAction<GameBoard>>
  currentMove: Color
  setCurrentMove: Dispatch<SetStateAction<Color>>
  updateMoveHistory: Dispatch<SetStateAction<string[]>>
  setStateHistory: Dispatch<SetStateAction<GameBoard[]>>
}

export function Game({
  gameState,
  setGameState,
  currentMove,
  setCurrentMove,
  updateMoveHistory,
  setStateHistory
}: Props) {
  const [legalMoves, setLegalMoves] = useState<Location[]>([])
  const [showingLegal, setShowingLegal] = useState(false)
  const [selected, setSelected] = useState<Location>()

  const movePiece = (row: number, col: number) => {
    if (!selected) return
    const piece = gameState[selected.col][selected.row] as Piece
    const oldGameState: GameBoard = gameState.map((col) => col.map((cell) => cell ? { ...cell } : null)) // Deep copy
    setStateHistory((prev) => [...prev, oldGameState])
    const newGameState = [ ...gameState ]
    const isCapture = newGameState[col][row] !== null
    const pieceSH = piece.type === 'knight' ? 'N' : piece.type.charAt(0).toUpperCase()
    newGameState[selected.col][selected.row] = null
    newGameState[col][row] = piece
    setShowingLegal(false)
    setSelected(undefined)
    updateMoveHistory((prev: string[]) => [
      ...prev,
      pieceSH + (isCapture ? 'x' : '') + String.fromCharCode(col + 97) + (row + 1),
    ])
    setLegalMoves([])
    setCurrentMove(currentMove === 'white' ? 'black' : 'white')
    setGameState(newGameState)
  }

  const handleSquareClick = (row: number, col: number) => {
    if (showingLegal && isInLegalMoves(legalMoves, row, col)) return movePiece(row, col)
    if (gameState[col][row] === null || gameState[col][row].color !== currentMove) return
    setSelected({ row, col })
    setShowingLegal(true)
    setLegalMoves(findLegalMoves(gameState, currentMove, row, col))
  }

  return (
    <div>
      {[...Array(8).keys()].map((row) => {
        row = 7 - row
        return (
          <div key={row}>
            <span className="row-label">{row + 1}</span>
            {[...Array(8).keys()].map((col) => (
              <Square
                key={`${row}-${col}`}
                piece={gameState[col][row]}
                isLegal={isInLegalMoves(legalMoves, row, col)}
                handleClick={() => handleSquareClick(row, col)}
              />
            ))}
          </div>
        )
      })}
      <div className="col-label">
        {[...Array(8).keys()].map((col) => (
          <span key={col}>{String.fromCharCode(col + 97)}</span>
        ))}
      </div>
    </div>
  )
}

function isInLegalMoves(legalMoves: Location[], row: number, col: number): boolean {
  return legalMoves.some((move) => move.row === row && move.col === col)
}

function findLegalMoves(gameState: GameBoard, turn: Color, row: number, col: number): Location[] {
  const piece = gameState[col][row]
  const loc: Location = { col, row }
  const legalMoves: Location[] = []
  if (piece && piece.color === turn) {
    if (piece.type === 'pawn') {
      let limit = 1
      const dir = turn === 'white' ? 1 : -1
      if (row === (turn === 'white' ? 1 : 6)) limit = 2
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row + dir }), loc, limit, false)
      ;[
        { col: col + 1, row: row + dir },
        { col: col - 1, row: row + dir },
      ].forEach((newLoc: Location) => {
        if (validateMove(newLoc)) {
          const space = gameState[newLoc.col][newLoc.row]
          if (space && space.color !== turn) {
            legalMoves.push(newLoc)
          }
        }
      })
    } else if (piece.type === 'rook') {
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row + 1 }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row - 1 }), { col, row })
    } else if (piece.type === 'knight') {
      ;[
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
      ].map((move) => {
        const loc = { col: col + move[0], row: row + move[1] }
        if (!validateMove(loc)) return
        const space = gameState[loc.col][loc.row]
        if (space === null) {
          legalMoves.push(loc)
        } else if (space.color !== gameState[col][row]?.color) {
          legalMoves.push(loc)
        }
      })
    } else if (piece.type === 'bishop') {
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row + 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row - 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row - 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row + 1 }), { col, row }, 8)
    } else if (piece.type === 'queen') {
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row + 1 }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row - 1 }), { col, row })
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row + 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row - 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row - 1 }), { col, row }, 8)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row + 1 }), { col, row }, 8)
    } else if (piece.type === 'king') {
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col + 1, row: loc.row }), { col, row }, 1)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col - 1, row: loc.row }), { col, row }, 1)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row + 1 }), { col, row }, 1)
      checkPath(legalMoves, gameState, col, row, (loc) => ({ col: loc.col, row: loc.row - 1 }), { col, row }, 1)
    }
  }
  return legalMoves


}

export function validateMove(newLoc: Location) {
  return newLoc.col >= 0 && newLoc.col < 8 && newLoc.row >= 0 && newLoc.row < 8
}

export function checkPath(
  legalMoves: Location[],
  gameState: GameBoard,
  col: number,
  row: number,
  reducer: (loc: Location) => Location,
  loc: Location,
  limit = 8,
  captures = true
) {
  for (let i = 0; i < limit; i++) {
    loc = reducer(loc)
    if (!validateMove(loc)) break
    const space = gameState[loc.col][loc.row]
    if (space === null) {
      legalMoves.push(loc)
      continue
    } else if (captures && space.color !== gameState[col][row]?.color) {
      legalMoves.push(loc)
    }
    break
  }
}