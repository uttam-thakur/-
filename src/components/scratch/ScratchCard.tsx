import { useScratchCard } from '../../hooks/useScratchCard';
import { copy } from '../../content/invitation';
import { dateOnly } from '../../helpers/presentation';
import { primaryEvent } from '../../helpers/presentation';
import { text } from '../../content/invitation';
import { timeOnly } from '../../helpers/presentation';
import { downloadCalendar } from '../../helpers/downloadCalendar';
import RevealConfetti from './RevealConfetti';
export default function ScratchCard() {
  const { canvas, revealed, burst, dragging, scratch, revealDate } = useScratchCard();
  return (
    <section className="scratch-card reveal">
      <h2>{copy.scratch.title}</h2>
      <p>{copy.scratch.instructions}</p>
      <div className="scratch-area">
        <div className="scratch-message">
          <p className="script">{copy.scratch.announcement}</p>
          <strong>{dateOnly(primaryEvent().startsAt)}</strong>
          <p>{text(copy.scratch.time, { time: timeOnly(primaryEvent().startsAt) })}</p>
          <small>{copy.scratch.invitation}</small>
        </div>
        {!revealed && (
          <canvas
            ref={canvas}
            width="420"
            height="280"
            aria-label={copy.scratch.canvasLabel}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={() => (dragging.current = false)}
          />
        )}
      </div>
      {!revealed ? (
        <div className="scratch-caption">
          <span>{copy.scratch.hint}</span>
          <button onClick={revealDate}>{copy.scratch.reveal}</button>
        </div>
      ) : (
        <button className="calendar-button" onClick={downloadCalendar}>
          {copy.scratch.calendar}
        </button>
      )}
      {burst && <RevealConfetti origin={burst} />}
    </section>
  );
}
