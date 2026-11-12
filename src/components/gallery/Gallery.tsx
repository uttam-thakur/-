import { useGallery } from '../../hooks/useGallery';
import { gallery } from '../../data/gallery';
import { galleryOffset } from '../../helpers/gallery';
import { copy } from '../../content/invitation';
import Heading from '../common/Heading';
import GalleryCard from './GalleryCard';
import GalleryControls from './GalleryControls';
import GalleryLightbox from './GalleryLightbox';
export default function Gallery() {
  const state = useGallery(gallery.length);
  if (!gallery.length) return null;
  return (
    <section className="gallery-section" id="gallery">
      <Heading eyebrow={copy.gallery.eyebrow} title={copy.gallery.title} />
      <div
        className="gallery-stage"
        aria-label={copy.gallery.label}
        {...state.stageProps}
      >
        {gallery.map((photo, index) => (
          <GalleryCard
            key={photo[0]}
            photo={photo}
            offset={galleryOffset(index, state.active, gallery.length)}
            onSelect={() => state.select(index)}
          />
        ))}
      </div>
      <p className="gallery-caption script">{gallery[state.active][1]}</p>
      <GalleryControls
        active={state.active}
        move={state.move}
        select={state.setSelected}
      />
      <GalleryLightbox
        photo={gallery[state.active]}
        open={state.zoom}
        onClose={state.close}
      />
    </section>
  );
}
