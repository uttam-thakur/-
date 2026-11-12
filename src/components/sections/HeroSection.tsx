import { assets } from '../../data/assets';
import { copy } from '../../content/invitation';
import { bride } from '../../data/bride';
import { groom } from '../../data/groom';
export default function HeroSection({ showScroll }: { showScroll: boolean }) {
  return (
    <section className="hero">
      <img className="hero-sky" src={assets.sky} alt="" />
      <div className="sun-rays" />
      <div className="sun-glow" aria-hidden="true" />
      <div className="hero-names">
        <p className="script">{copy.hero.blessing}</p>
        <p className="script">{copy.hero.blessingPara}</p>
        <h1 id="invitation-title" tabIndex={-1}>
          <span>{bride.firstName}</span>
          <em>{copy.common.joiner}</em>
          <span>{groom.firstName}</span>
        </h1>
      </div>
      <img className="palace" src={assets.palace} alt={copy.hero.palaceAlt} />
      {showScroll && (
        <button
          className="scroll-now"
          onClick={() =>
            document
              .querySelector('[data-section],.footer')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          {copy.hero.scroll}
        </button>
      )}
    </section>
  );
}
