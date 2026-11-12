import VenueMap from '../venues/VenueMap';
import Heading from '../common/Heading';
import { copy } from '../../content/invitation';
import { venues } from '../../data/venues';
import { events } from '../../data/events';
import { galleryImage } from '../../data/assets';
import { fullDate } from '../../helpers/presentation';
import { timeOnly } from '../../helpers/presentation';
export default function VenuesSection() {
  return (
    <section className="venues" id="venues">
      <Heading eyebrow={copy.venues.eyebrow} title={copy.venues.title} />
      {venues.map((v) => {
        const venueEvents = events.filter((event) => event.venueId === v.id);
        return (
          <article className="venue-card reveal" key={v.id}>
            <img
              className="venue-background"
              src={galleryImage(v.image)}
              alt=""
              loading="lazy"
            />
            <div className="venue-copy">
              <p className="script">{copy.venues.join}</p>
              <h3>{v.name}</h3>
              <span className="flourish">◆</span>
              <div className="venue-detail">
                <span aria-hidden="true">✧</span>
                <div>
                  <small>{copy.venues.celebration}</small>
                  <p>{venueEvents.map((e) => e.name).join(copy.common.joiner)}</p>
                </div>
              </div>
              <div className="venue-detail">
                <span aria-hidden="true">⌖</span>
                <div>
                  <small>{copy.venues.address}</small>
                  <p>{v.address}</p>
                </div>
              </div>
              {venueEvents.length === 1 && (
                <>
                  <div className="venue-detail">
                    <span aria-hidden="true">▦</span>
                    <div>
                      <small>{copy.venues.date}</small>
                      <p>{fullDate(venueEvents[0].startsAt)}</p>
                    </div>
                  </div>
                  <div className="venue-detail">
                    <span aria-hidden="true">◷</span>
                    <div>
                      <small>{copy.venues.time}</small>
                      <p>{timeOnly(venueEvents[0].startsAt)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <VenueMap name={v.name} address={v.address} />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </article>
        );
      })}
    </section>
  );
}
