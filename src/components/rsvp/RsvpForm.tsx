import { copy } from '../../content/invitation';
import { bride } from '../../data/bride';
import { groom } from '../../data/groom';
import { invitationConfig } from '../../config/invitation';
import { useRsvp } from '../../hooks/useRsvp';
import AttendanceChoice from './AttendanceChoice';
import GuestCounter from './GuestCounter';
import FormCorners from '../common/FormCorners';
export default function RsvpForm() {
  const form = useRsvp();
  return (
    <form className="rsvp-form reveal" onSubmit={form.submit}>
      <FormCorners />
      <div className="rsvp-crest" aria-hidden="true">
        {groom.firstName[0]}
        <span>{copy.common.joiner}</span>
        {bride.firstName[0]}
      </div>
      <p className="script">{copy.rsvp.invitation}</p>
      <h3>
        {groom.firstName}
        <span>{copy.common.joiner}</span>
        {bride.firstName}
      </h3>
      <span className="flourish">◆</span>
      <label htmlFor="rsvp-name">{copy.rsvp.name}</label>
      <input
        id="rsvp-name"
        name="name"
        placeholder={copy.rsvp.namePlaceholder}
        required
        maxLength={invitationConfig.rsvp.maxNameLength}
        autoComplete="name"
      />
      <AttendanceChoice attending={form.attending} onChange={form.setAttending} />
      {form.attending && (
        <GuestCounter
          guests={form.guests}
          onDecrease={form.decrease}
          onIncrease={form.increase}
        />
      )}
      <label htmlFor="blessings">{copy.rsvp.blessings}</label>
      <textarea
        id="blessings"
        name="message"
        placeholder={copy.rsvp.messagePlaceholder}
        maxLength={invitationConfig.rsvp.maxMessageLength}
        rows={3}
      />
      <button className="gold-button">{copy.rsvp.send}</button>
      {form.status && (
        <p role="status" className="form-status">
          {form.status}
        </p>
      )}
    </form>
  );
}
