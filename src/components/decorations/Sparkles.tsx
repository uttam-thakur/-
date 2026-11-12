export default function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${(37 * i + 11) % 100}%`,
            top: `${(53 * i + 7) % 100}%`,
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            animationDelay: `${(i * 0.7) % 5}s`,
          }}
        />
      ))}
    </div>
  );
}
