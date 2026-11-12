import { copy } from '../../content/invitation';
interface Props {
  attending: boolean;
  onChange: (value: boolean) => void;
}
export default function AttendanceChoice({ attending, onChange }: Props) {
  return (
    <fieldset>
      <legend>{copy.rsvp.attendance}</legend>
      <div className="attendance">
        {[true, false].map((value) => (
          <label key={String(value)} className={attending === value ? 'checked' : ''}>
            <input
              type="radio"
              name="attendance"
              checked={attending === value}
              onChange={() => onChange(value)}
            />
            <span>
              <b aria-hidden="true">{value ? '♥' : '♡'}</b>
              {value ? copy.rsvp.accept : copy.rsvp.decline}
              <small>{value ? copy.rsvp.acceptNote : copy.rsvp.declineNote}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
