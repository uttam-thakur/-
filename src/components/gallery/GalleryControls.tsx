import { copy, text } from '../../content/invitation';
import { galleryImage } from '../../data/assets';
import { gallery } from '../../data/gallery';
interface Props {
  active: number;
  move: (direction: number) => void;
  select: (index: number) => void;
}
export default function GalleryControls({ active, move, select }: Props) {
  return (
    <div className="gallery-controls">
      <button onClick={() => move(-1)} aria-label={copy.gallery.previous}>
        ←
      </button>
      {gallery.map(([file, title], index) => (
        <button
          key={file}
          className={`gallery-thumb ${index === active ? 'selected' : ''}`}
          aria-label={text(copy.gallery.thumbnail, { number: index + 1, title })}
          aria-pressed={index === active}
          onClick={() => select(index)}
        >
          <img src={galleryImage(file)} alt="" loading="lazy" />
        </button>
      ))}
      <button onClick={() => move(1)} aria-label={copy.gallery.next}>
        →
      </button>
    </div>
  );
}
