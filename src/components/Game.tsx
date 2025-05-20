import { useState } from "react";
import type { Color, Piece } from "../Piece";
import Square from "./Square";

export default function Game({ gameState, setGameState, currentMove, setCurrentMove, setMoveHistory }: { gameState: any; setGameState: any; currentMove: Color; setCurrentMove: any; setMoveHistory: any }) {
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [showingLegal, setShowingLegal] = useState(false);
    const [selected, setSelected] = useState("");
    const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const rows = [7, 6, 5, 4, 3, 2, 1, 0];

    const movePiece = (row: number, col: string) => {
        const piece = gameState[selected[0]][selected[1]];
        if (selected !== "") {
            const newGameState = { ...gameState };
            newGameState[selected[0]][selected[1]] = null;
            newGameState[col][row] = piece;
            setShowingLegal(false)
            setSelected("");
            setLegalMoves([]);
            setCurrentMove(currentMove === "white" ? "black" : "white");
            setGameState(newGameState);
        }
    }


    const handleSquareClick = (row: number, col: string, isLegal: bool) => {
        if (showingLegal && legalMoves.includes(`${col}${row}`)) {
            movePiece(row, col);
            return;
        }
        setSelected(col + row.toString());
        // TODO: Handle captures and colision checking
        var newLegalMoves: string[] = [];
        const piece = gameState[col][row];
        if (piece && piece.color === currentMove) {
            if (piece.type === "pawn") {
                if (piece.color === "white")
                    newLegalMoves.push(`${col}${row + 1}`);
                else
                    newLegalMoves.push(`${col}${row - 1}`);
            } else if (piece.type === "rook") {
                for (let i = row + 1; i < 8; i++) {
                    newLegalMoves.push(`${col}${i}`);
                }
                for (let i = row - 1; i >= 0; i--) {
                    newLegalMoves.push(`${col}${i}`);
                }
                for (let i = col.charCodeAt(0) + 1; i < 8; i++) {
                    newLegalMoves.push(`${String.fromCharCode(i)}${row}`);
                }
                for (let i = col.charCodeAt(0) - 1; i >= 0; i--) {
                    newLegalMoves.push(`${String.fromCharCode(i)}${row}`);
                }
            } else if (piece.type === "knight") {
                [[2, 1], [2, -1], [-2, 1], [-2, -1],
                    [1, 2], [1, -2], [-1, 2], [-1, -2]].map((move) => {
                    const newRow = row + move[0];
                    const newCol = String.fromCharCode(col.charCodeAt(0) + move[1]);
                    if (newRow >= 0 && newRow < 8 && newCol >= 'A' && newCol <= 'H') {
                        newLegalMoves.push(`${newCol}${newRow}`);
                    }
                })
            } else if (piece.type === "bishop") {
                for (let i = 1; i < 8; i++) {
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) + i)}${row + i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) - i)}${row + i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) + i)}${row - i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) - i)}${row - i}`);
                }
            } else if (piece.type === "queen") {
                for (let i = row + 1; i < 8; i++) {
                    newLegalMoves.push(`${col}${i}`);
                }
                for (let i = row - 1; i >= 0; i--) {
                    newLegalMoves.push(`${col}${i}`);
                }
                for (let i = col.charCodeAt(0) + 1; i < 8; i++) {
                    newLegalMoves.push(`${String.fromCharCode(i)}${row}`);
                }
                for (let i = col.charCodeAt(0) - 1; i >= 0; i--) {
                    newLegalMoves.push(`${String.fromCharCode(i)}${row}`);
                }
                for (let i = 1; i < 8; i++) {
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) + i)}${row + i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) - i)}${row + i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) + i)}${row - i}`);
                    newLegalMoves.push(`${String.fromCharCode(col.charCodeAt(0) - i)}${row - i}`);
                }
            } else if (piece.type === "king") {
                [[1, 0], [-1, 0], [0, 1], [0, -1],
                    [1, 1], [-1, -1], [1, -1], [-1, 1]].map((move) => {
                        const newRow = row + move[0];
                        const newCol = String.fromCharCode(col.charCodeAt(0) + move[1]);
                        if (newRow >= 0 && newRow < 8 && newCol >= 'A' && newCol <= 'H') {
                            newLegalMoves.push(`${newCol}${newRow}`);
                        }
                    })
            }
            setShowingLegal(true);
            setLegalMoves(newLegalMoves);
        }
    }

    return (
        <span className="game-board">
        {rows.map((row) => (
            <div className="game-row" key={row}>
            {cols.map((col) => (
                <Square
                row={row}
                col={col}
                piece={gameState[col][row]}
                isLegal={legalMoves.includes(`${col}${row}`)}
                handleClick={() => handleSquareClick(row, col)}
                />
            ))}
            </div>
        ))}
        </span>
)}