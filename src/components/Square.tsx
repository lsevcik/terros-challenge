export default function Square ({ row, col, piece }: { square: string; piece: any; isSelected: boolean; onClick: () => void; onMove: () => void }) {
    const handleClick = () => {
        // TODO: Show available moves for the piece
    };

    return (
        <span className="square" onClick={handleClick}>
            { piece ? piece.color[0] + piece.type[0] : " " }
        </span>
    );
}