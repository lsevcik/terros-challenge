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

  const [currentMove, setCurrentMove] = useState<Color>('white')
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  return (
    <>
      <div className="flex-none p-4">
        <Clock currentMove={currentMove} gameHasStarted={Boolean(moveHistory.length)}></Clock>
        <div className="move-indicator">{currentMove} to move</div>
        <Game
          gameState={gamePieces}
          setGameState={setGamePieces}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
          updateMoveHistory={setMoveHistory}
        ></Game>
      </div>
      <div className="flex-1 overflow-y-scroll">
        <MoveList moveHistory={moveHistory}></MoveList>
      </div>
    </>
  )
}

export default App
