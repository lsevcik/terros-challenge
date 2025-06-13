import { useState } from 'react'

import { Clock } from './components/Clock'
import { Game } from './components/Game'
import { MoveList } from './components/MoveList'

import type { Color, Piece, GameBoard } from './types'
import './App.css'

const wp: Piece = { type: 'pawn', color: 'white' }
const wr: Piece = { type: 'rook', color: 'white' }
const wn: Piece = { type: 'knight', color: 'white' }
const wb: Piece = { type: 'bishop', color: 'white' }
const wq: Piece = { type: 'queen', color: 'white' }
const wk: Piece = { type: 'king', color: 'white' }
const bp: Piece = { type: 'pawn', color: 'black' }
const br: Piece = { type: 'rook', color: 'black' }
const bn: Piece = { type: 'knight', color: 'black' }
const bb: Piece = { type: 'bishop', color: 'black' }
const bq: Piece = { type: 'queen', color: 'black' }
const bk: Piece = { type: 'king', color: 'black' }

function App() {
  const [gamePieces, setGamePieces] = useState<GameBoard>([
    [wr, wp, null, null, null, null, bp, br],
    [wn, wp, null, null, null, null, bp, bn],
    [wb, wp, null, null, null, null, bp, bb],
    [wq, wp, null, null, null, null, bp, bq],
    [wk, wp, null, null, null, null, bp, bk],
    [wb, wp, null, null, null, null, bp, bb],
    [wn, wp, null, null, null, null, bp, bn],
    [wr, wp, null, null, null, null, bp, br],
  ])

  const [stateHistory, setStateHistory] = useState<GameBoard[]>([])
  
  const [currentMove, setCurrentMove] = useState<Color>('white')
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const undoButtonClicked = () => {
    console.log(stateHistory)
    if (stateHistory.length < 1) return
    const newHistory = [...stateHistory]
    setGamePieces(stateHistory[stateHistory.length - 1]) // Restore last state
    newHistory.pop() // Remove the last state
    setStateHistory(newHistory)
    setCurrentMove(currentMove === 'white' ? 'black' : 'white') // Switch turn
    setMoveHistory((prev) => prev.slice(0, -1)) // Remove last move from history
    console.log(newHistory)
  }

  return (
    <>
      <div className="flex-none p-4">
        <Clock currentMove={currentMove} gameHasStarted={Boolean(moveHistory.length)}></Clock>
        <div className="move-indicator">{currentMove} to move</div>
        <Game
          key={JSON.stringify(gamePieces)} // Force re-render on game state change
          gameState={gamePieces}
          setGameState={setGamePieces}
          setStateHistory={setStateHistory}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
          updateMoveHistory={setMoveHistory}
        ></Game>
      </div>
      <div className="flex-1 overflow-y-scroll">
        <MoveList moveHistory={moveHistory}></MoveList>
      </div>
      <button onClick={undoButtonClicked}>Undo last move</button>
    </>
  )
}

export default App
