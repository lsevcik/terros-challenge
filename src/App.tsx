import { useState } from 'react'

import Clock from './components/Clock';
import Game from './components/Game';
import MoveList from './components/MoveList';

import type { Color, Piece } from './Piece';
import './App.css'

const wp: Piece = { type: 'pawn', color: 'white' };
const wr: Piece = { type: 'rook', color: 'white' };
const wn: Piece = { type: 'knight', color: 'white' };
const wb: Piece = { type: 'bishop', color: 'white' };
const wq: Piece = { type: 'queen', color: 'white' };
const wk: Piece = { type: 'king', color: 'white' };
const bp: Piece = { type: 'pawn', color: 'black' };
const br: Piece = { type: 'rook', color: 'black' };
const bn: Piece = { type: 'knight', color: 'black' };
const bb: Piece = { type: 'bishop', color: 'black' };
const bq: Piece = { type: 'queen', color: 'black' };
const bk: Piece = { type: 'king', color: 'black' };

function App() {
  const [gamePieces, setGamePieces] = useState({
    A: [wr, wp, null, null, null, null, bp, br],
    B: [wn, wp, null, null, null, null, bp, bn],
    C: [wb, wp, null, null, null, null, bp, bb],
    D: [wq, wp, null, null, null, null, bp, bq],
    E: [wk, wp, null, null, null, null, bp, bk],
    F: [wb, wp, null, null, null, null, bp, bb],
    G: [wn, wp, null, null, null, null, bp, bn],
    H: [wr, wp, null, null, null, null, bp, br],
  })

  const [currentMove, setCurrentMove] = 'white' as Color;
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  return (
    <>
      <div className="info-header">
        <Clock currentMove={currentMove}></Clock>
        <div className="move-indicator">
          {currentMove} to move
        </div>
      </div>
      <div className="game-container">
        <Game gameState={gamePieces} setGameState={setGamePieces} currentMove={currentMove} setCurrentMove={setCurrentMove} setMoveHistory={setMoveHistory}></Game>
        <MoveList moveHistory={moveHistory}></MoveList>
      </div>
    </>
  )
}

export default App
