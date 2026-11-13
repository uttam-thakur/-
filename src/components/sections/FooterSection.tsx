import { assets } from '../../data/assets';
import { copy } from '../../content/invitation';
import { bride } from '../../data/bride';
import { groom } from '../../data/groom';
import { fullDate, primaryEvent, weddingHashtag } from '../../helpers/presentation';
import { useClipboard } from '../../hooks/useClipboard';
export default function FooterSection() {
  const { copied, copy: copyHashtag } = useClipboard();
  return (
    <footer className="footer">
      <div className="footer-details">
        <img className="rosette" src={assets.rosette} alt="" loading="lazy" />
        <p className="script">{copy.footer.heading}</p>
      <h2>
  {bride.firstName}
  <span>{copy.common.joiner}</span>
  {groom.firstName}
</h2>
        <p>{fullDate(primaryEvent().startsAt)}</p>
        <button className="hashtag" onClick={() => void copyHashtag(weddingHashtag())}>
          {copied ? copy.common.copied : weddingHashtag()}
        </button>
      </div>
      <img
        className="desert"
        src={assets.desert}
        alt={copy.footer.desertAlt}
        loading="lazy"
      />
    </footer>
  );
}