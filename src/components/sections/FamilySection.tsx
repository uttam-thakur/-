import Heading from '../common/Heading';
import { copy } from '../../content/invitation';
import { families } from '../../data/family';
import PaintedFrame from '../frames/PaintedFrame';
export default function FamilySection() {
  return (
    <section className="family-section">
      <Heading eyebrow={copy.family.eyebrow} title={copy.family.title} />
      {families.map((group) => (
        <div className="family-group" key={group.id}>
          <h3 className="script family-heading">{copy.family.groups[group.id]}</h3>
          <div className="family-members">
            {group.members.map((member) => (
              <article className="family-member reveal" key={member.id}>
                <PaintedFrame colors={member.colors}>
                  <img src={member.image} alt={member.name} loading="lazy" />
                </PaintedFrame>
                <p className="family-role">{copy.family.roles[group.id][member.id]}</p>
                <h3>{member.name}</h3>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
