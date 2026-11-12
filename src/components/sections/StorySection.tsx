import Heading from '../common/Heading';
import { copy } from '../../content/invitation';
import { story } from '../../data/story';
import PaintedFrame from '../frames/PaintedFrame';
import { text } from '../../content/invitation';
import { groom } from '../../data/groom';
import { bride } from '../../data/bride';
export default function StorySection() {
  return (
    <section className="story-section">
      <Heading eyebrow={copy.story.eyebrow} title={copy.story.title} />
      <div className="story-list">
        {story.map((milestone) => (
          <article className="story-milestone reveal" key={milestone.id}>
            <PaintedFrame colors={milestone.colors}>
              <span className="story-year script">{milestone.year}</span>
            </PaintedFrame>
            <div className="story-copy">
              <p className="script">{milestone.date}</p>
              <h3>{milestone.title}</h3>
              <span className="event-rule" />
              <p>
                {text(milestone.description, {
                  groom: groom.firstName,
                  bride: bride.firstName,
                })}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
