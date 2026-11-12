export default function GateDust() {
  return (
    <div className="gate-dust" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${(53 * i + 7) % 100}%`,
            animationDuration: `${7 + (i % 5) * 1.6}s`,
            animationDelay: `-${i * 0.55}s`,
          }}
        />
      ))}
    </div>
  );
}
