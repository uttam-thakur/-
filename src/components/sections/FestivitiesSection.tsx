import { events } from '../../data/events';
import Heading from '../common/Heading';
import { text } from '../../content/invitation';
import { copy } from '../../content/invitation';
import { celebrationDays } from '../../helpers/presentation';
import { assets } from '../../data/assets';
import { shortDate } from '../../helpers/presentation';
import { timeOnly } from '../../helpers/presentation';
import { eventVenue } from '../../helpers/presentation';
export default function FestivitiesSection() {
  if (!events.length) return null;
  return (
    <section className="festivities">
      <Heading
        eyebrow={text(copy.festivities.eyebrow, { days: celebrationDays() })}
        title={copy.festivities.title}
      />
      <div className="event-timeline">
        <div className="timeline-line">
          <span className="timeline-progress" />
        </div>
        <div className="timeline-car">
          <img src={assets.car} alt="" />
        </div>
        {events.map((event, i) => (
          <article className={`ceremony ${i % 2 ? 'reverse' : ''}`} key={event.id}>
            <div className="event-date script">{shortDate(event.startsAt)}</div>
            <span className="timeline-jewel">◆</span>
            <div className="royal-scroll">
              <img className="scroll-top" src={assets.scrollTop} alt="" loading="lazy" />
              <div className="scroll-content">
                <div className="scroll-paper">
                  <img
                    className="scroll-body"
                    src={assets.scrollBody}
                    alt=""
                    loading="lazy"
                  />
                  <div className="event-copy">
                    <small>{text(copy.festivities.event, { number: i + 1 })}</small>
                    <span className="event-icon" aria-hidden="true">
                      {event.icon}
                    </span>
                    <h3>{event.name}</h3>
                    {event.note && <em>{event.note}</em>}
                    <p>{shortDate(event.startsAt)}</p>
                    <span className="event-rule" />
                    <p>{timeOnly(event.startsAt)}</p>
                    <p>{eventVenue(event.venueId).name}</p>
                    <small className="dress-label">{copy.festivities.dressCode}</small>
                    <p>{event.dress}</p>
                  </div>
                </div>
                <img
                  className="scroll-bottom"
                  src={assets.scrollBottom}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
