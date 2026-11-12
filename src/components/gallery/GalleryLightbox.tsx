import { useRef, useEffect } from 'react';
import type { GalleryPhoto } from '../../types/gallery';
import { copy } from '../../content/invitation';
import { galleryImage } from '../../data/assets';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
interface Props {
  photo: GalleryPhoto;
  open: boolean;
  onClose: () => void;
}
export default function GalleryLightbox({ photo: [file, title], open, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useBodyScrollLock(open);
  useEffect(() => {
    const element = dialog.current;
    if (open) element?.showModal();
    else element?.close();
    return () => element?.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="photo-dialog"
    >
      <button className="dialog-close" onClick={onClose} aria-label={copy.gallery.close}>
        ×
      </button>
      <img src={galleryImage(file)} alt={title} />
      <p>{title}</p>
    </dialog>
  );
}
