import { copy, text } from '../../content/invitation';
import { venueMapLinks } from '../../helpers/maps';
export default function VenueMap({ name, address }: { name: string; address: string }) {
  const links = venueMapLinks(name, address);
  return (
    <div className="venue-map">
      <iframe
        src={links.embed}
        title={text(copy.venues.mapTitle, { venue: name })}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        className="gold-button"
        href={links.open}
        target="_blank"
        rel="noopener noreferrer"
      >
        {copy.venues.openMap}
      </a>
    </div>
  );
}
