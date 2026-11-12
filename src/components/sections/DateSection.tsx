import DateFrame from '../frames/DateFrame';
import { dateText } from '../../helpers/presentation';
import { primaryEvent } from '../../helpers/presentation';
import { copy } from '../../content/invitation';
export default function DateSection() {
  return (
    <section className="date-section" id="date">
      <div className="reveal">
        <DateFrame>
          <p>{dateText(primaryEvent().startsAt, { weekday: 'long', day: 'numeric' })}</p>
          <p>{dateText(primaryEvent().startsAt, { month: 'long', year: 'numeric' })}</p>
          <span>{copy.date.caption}</span>
        </DateFrame>
      </div>
    </section>
  );
}
