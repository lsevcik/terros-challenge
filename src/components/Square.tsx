import type {Piece} from "../Piece";

export default function Square ({ row, col, piece, isLegal, handleClick }: { row: number, col: string, piece: Piece | null, isLegal: boolean, handleClick: () => void }) {

    return (
        <span className={ isLegal ? "selected square" : "square"} onClick={handleClick}>
            { piece ? piece.color[0] + piece.type[0] : " " }
        </span>
    );
}