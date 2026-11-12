export default function Lotus({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-7 1 Q0 -3 7 1 Q0 4 -7 1" fill="#318949" />
      {[-62, 62, -32, 32, 0].map((a) => (
        <path
          key={a}
          d="M0 0 C-3 -3 -2 -8 0 -11 C2 -8 3 -3 0 0"
          transform={`rotate(${a}) scale(${a === 0 ? 1 : 0.85})`}
          fill="#e84980"
          stroke="#ffd9e6"
          strokeWidth=".3"
        />
      ))}
      <circle cy="-1" r="1" fill="#ffdb72" />
    </g>
  );
}
