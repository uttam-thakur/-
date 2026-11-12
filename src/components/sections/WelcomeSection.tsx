import { assets } from '../../data/assets';
import { copy } from '../../content/invitation';
export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="rosette-reveal reveal">
        <img className="rosette" src={assets.rosette} alt="" />
      </div>
      <div className="welcome reveal">
        <p className="script">{copy.welcome.heading}</p>
        <p>
          {copy.welcome.body.map((line, i) => (
            <span key={i}>
              {i > 0 && (
                <>
                  {' '}
                  <br className="desktop-break" />
                </>
              )}
              {line}
            </span>
          ))}
        </p>
        <span className="flourish">◆</span>
      </div>
    </section>
  );
}
