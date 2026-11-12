import { copy } from '../../content/invitation';
import Countdown from '../common/Countdown';
export default function CountdownSection() {
  return (
    <section className="countdown-section">
      <p className="script counting reveal">{copy.countdown.heading}</p>
      <Countdown />
    </section>
  );
}
