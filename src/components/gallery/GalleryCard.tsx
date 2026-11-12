import type { CSSProperties } from 'react';
import type { GalleryPhoto } from '../../types/gallery';
import { copy, text } from '../../content/invitation';
import { galleryImage } from '../../data/assets';
import PaintedFrame from '../frames/PaintedFrame';
interface Props {
  photo: GalleryPhoto;
  offset: number;
  onSelect: () => void;
}
export default function GalleryCard({ photo: [file, title], offset, onSelect }: Props) {
  return (
    <button
      className={`gallery-photo ${offset === 0 ? 'active' : ''}`}
      style={
        {
          '--offset': offset,
          opacity: Math.abs(offset) > 2 ? 0 : 1,
          zIndex: 5 - Math.abs(offset),
        } as CSSProperties
      }
      tabIndex={Math.abs(offset) > 2 ? -1 : 0}
      aria-label={text(offset === 0 ? copy.gallery.enlarge : copy.gallery.show, {
        title,
      })}
      onClick={onSelect}
    >
      <PaintedFrame gold>
        <img src={galleryImage(file)} draggable={false} alt={title} loading="lazy" />
      </PaintedFrame>
    </button>
  );
}
