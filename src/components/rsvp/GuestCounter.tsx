import { copy } from '../../content/invitation';
import { invitationConfig } from '../../config/invitation';
interface Props {
  guests: number;
  onDecrease: () => void;
  onIncrease: () => void;
}
export default function GuestCounter({ guests, onDecrease, onIncrease }: Props) {
  return (
    <>
      <label>{copy.rsvp.guests}</label>
      <div className="guest-counter">
        <span>{copy.rsvp.includingYou}</span>
        <button
          type="button"
          aria-label={copy.rsvp.fewer}
          disabled={guests <= 1}
          onClick={onDecrease}
        >
          −
        </button>
        <output>{guests}</output>
        <button
          type="button"
          aria-label={copy.rsvp.more}
          disabled={guests >= invitationConfig.rsvp.maxGuests}
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </>
  );
}
