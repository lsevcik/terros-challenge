import clsx from 'clsx'
import type { Piece } from '../types'

type Props = {
  piece: Piece | null
  isLegal: boolean
  handleClick: VoidFunction
}

const pieceIcons: Record<string, string> = {
  'black-pawn': '♟',
  'black-rook': '♜',
  'black-knight': '♞',
  'black-bishop': '♝',
  'black-queen': '♛',
  'black-king': '♚',
  'white-pawn': '♙',
  'white-rook': '♖',
  'white-knight': '♘',
  'white-bishop': '♗',
  'white-queen': '♕',
  'white-king': '♔',
}

export function Square({ piece, isLegal, handleClick }: Props) {
  return (
    <span
      className={clsx('square', isLegal && piece && 'capturable', isLegal && 'highlighted')}
      onClick={handleClick}
    >
      {piece ? pieceIcons[`${piece.color}-${piece.type}`] : ' '}
    </span>
  )
}
