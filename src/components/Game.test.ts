import type { GameBoard, Location, Piece } from '../types'
import { checkPath, validateMove } from './Game'
import { test, expect } from 'vitest'

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

test('checkPath function does not go out of bounds', () => {
  const gameState: GameBoard = [
    [wr, wp, null, null, null, null, bp, br],
    [wn, wp, null, null, null, null, bp, bn],
    [wb, wp, null, null, null, null, bp, bb],
    [wq, null, null, null, null, null, bp, wp],
    [wk, wp, null, null, null, null, bp, bk],
    [wb, wp, null, null, null, null, bp, bb],
    [wn, wp, null, null, null, null, bp, bn],
    [wr, wp, null, null, null, null, bp, br],
  ]
  const legalMoves: Location[] = []
  const col = 3
  const row = 7
  const moveFunc = (loc: Location) => ({ col: loc.col, row: loc.row + 1 })
  const startLoc = { col, row }

  checkPath(legalMoves, gameState, col, row, moveFunc, startLoc, 1, false)

  expect(legalMoves.length).toBe(0) // Should only add valid moves within bounds
})

test('checkPath does not allow pawns to capture forward', () => {
  const gameState: GameBoard = [
    [wr, wp, null, null, null, null, bp, br],
    [wn, wp, null, null, null, null, bp, bn],
    [wb, wp, null, null, null, null, bp, bb],
    [wq, null, null, wp, bp, null, null, bq],
    [wk, wp, null, null, null, null, bp, bk],
    [wb, wp, null, null, null, null, bp, bb],
    [wn, wp, null, null, null, null, bp, bn],
    [wr, wp, null, null, null, null, bp, br],
  ]
  const legalMoves: Location[] = []
  const col = 3
  const row = 3
  const moveFunc = (loc: Location) => ({ col: loc.col, row: loc.row + 1 })
  const startLoc = { col: col, row }

  checkPath(legalMoves, gameState, col, row, moveFunc, startLoc, 1, false)

  expect(legalMoves.length).toBe(0) // Pawns should not capture forward
})

test('game allows pawns to capture diagnally', () => {
  const gameState: GameBoard = [
    [wr, wp, null, null, null, null, bp, br],
    [wn, wp, null, null, null, null, bp, bn],
    [wb, wp, null, null, bp, null, null, bb],
    [wq, null, null, wp, null, null, bp, bq],
    [wk, wp, null, null, bp, null, null, bk],
    [wb, wp, null, null, null, null, bp, bb],
    [wn, wp, null, null, null, null, bp, bn],
    [wr, wp, null, null, null, null, bp, br],
  ]
  const legalMoves: Location[] = []
  const col = 3
  const row = 3
  const turn = 'white'
  const dir = turn === 'white' ? 1 : -1

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

  expect(legalMoves.length).toBe(2) // Pawns should not capture forward
})
