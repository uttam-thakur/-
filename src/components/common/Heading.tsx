export default function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-heading reveal">
      <p className="script">{eyebrow}</p>
      <h2>{title}</h2>
      <span className="flourish">◆</span>
    </header>
  );
}
