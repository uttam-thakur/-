import { useCountdown } from '../../hooks/useCountdown';
import { copy } from '../../content/invitation';
import PaintedFrame from '../frames/PaintedFrame';
export default function Countdown() {
  const { left } = useCountdown();
  return (
    <div className="countdown reveal" aria-label={copy.countdown.label}>
      {copy.countdown.units.map((label, i) => (
        <div key={label}>
          <PaintedFrame blue={i % 2 === 1}>
            <div className="count-value">
              <strong>
                {left ? String(left[i]).padStart(2, '0') : copy.common.emptyCount}
              </strong>
              <span>{label}</span>
            </div>
          </PaintedFrame>
        </div>
      ))}
    </div>
  );
}
