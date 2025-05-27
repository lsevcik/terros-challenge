export function MoveList({ moveHistory }: { moveHistory: string[] }) {
  return (
    <div>
      <h2>Move History</h2>
      <ul>
        {moveHistory.map((move, i) => (
          <li key={i}>{move}</li>
        ))}
      </ul>
    </div>
  )
}
