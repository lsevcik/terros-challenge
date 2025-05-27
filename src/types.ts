export type Color = 'white' | 'black'

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'

export type Piece = {
  type: PieceType
  color: Color
}

export type GameBoard = (Piece | null)[][]

export type Location = {
  row: number
  col: number
}
