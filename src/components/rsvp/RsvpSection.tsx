import { copy } from '../../content/invitation';
import Heading from '../common/Heading';
// import RsvpForm from './RsvpForm';
export default function RsvpSection() {
  return (
    <section id="rsvp" className="rsvp-section">
      <Heading eyebrow={copy.rsvp.eyebrow} title={copy.rsvp.title} />
      {/* <RsvpForm /> */}
    </section>
  );
}
