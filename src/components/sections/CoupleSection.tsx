import Heading from '../common/Heading';
import { copy } from '../../content/invitation';
import { groom } from '../../data/groom';
import { bride } from '../../data/bride';
import PaintedFrame from '../frames/PaintedFrame';
import { galleryImage } from '../../data/assets';
import { text } from '../../content/invitation';
export default function CoupleSection() {
  return (
    <section className="couple-section">
      <Heading eyebrow={copy.couple.eyebrow} title={copy.couple.title} />
      <div className="couple-grid">
        {[groom, bride].map((person, i) => (
          <article key={person.fullName} className="person reveal">
            <PaintedFrame blue={i === 1} doors>
              <img
                className="portrait"
                src={galleryImage(person.portrait.file)}
                alt={person.fullName}
                style={{
                  objectPosition: person.portrait.position,
                  transformOrigin: person.portrait.position,
                }}
                loading="lazy"
              />
            </PaintedFrame>
            <p className="script">
              {i === 0 ? copy.couple.groomRole : copy.couple.brideRole}
            </p>
            <h3>{person.fullName}</h3>
            <p>
              {text(i === 0 ? copy.couple.groomParents : copy.couple.brideParents, {
                parents: person.parents.join(copy.common.joiner),
              })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
