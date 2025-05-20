export default function MoveList({ moveHistory }: { moveHistory: string[] }) {
    return (
        <span className="move-list">
            <h2>Move History</h2>
            <ul>
                {moveHistory.map((move, i) => (
                    <li key={i}>{move}</li>
                ))}
            </ul>
        </span>
    );
}