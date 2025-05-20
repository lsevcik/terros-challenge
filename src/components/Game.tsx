import type { Color } from "../Piece";
import Square from "./Square";

export default function Game({ gameState, setGameState, currentMove, setCurrentMove, setMoveHistory }: { gameState: any; setGameState: any; currentMove: Color; setCurrentMove: any; setMoveHistory: any }) {
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const rows = [7, 6, 5, 4, 3, 2, 1, 0];

    return (
        <span className="game-board">
        {rows.map((row) => (
            <div className="game-row" key={row}>
            {cols.map((col) => (
                <Square
                row={row}
                col={col}
                piece={gameState[col][row]}
                />
            ))}
            </div>
        ))}
        </span>
)}