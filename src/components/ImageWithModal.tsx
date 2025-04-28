import { useState, useRef, useEffect, FC, MouseEvent } from 'react';
import styled from 'styled-components';

// Styled Components for Thumbnail
const ThumbnailButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover img {
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
  }
`;

const ThumbnailImage = styled.img`
  display: block;
  width: 200px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.2s;
`;

const StyledDialog = styled.dialog`
  padding: 0;
  border: none;
  max-width: 90vw;
  max-height: 90vh;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  background: transparent;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::backdrop {
    background: rgba(0, 0, 0, 0.75);
  }
`;

const Content = styled.div`
  position: relative;
  background: transparent;
  padding: 0;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LargeImage = styled.img.attrs({ tabIndex: -1, draggable: false })`
  max-width: 80vw;
  max-height: 80vh;
  display: block;
  border-radius: 4px;
  pointer-events: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

type ImageWithModalProps = {
  src: string;
  alt: string;
};

const ImageModal: FC<ImageWithModalProps & { onClose: () => void }> = ({ src, alt, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    previousActiveElement.current = document.activeElement as HTMLElement;
    dialog.showModal();

    // Focus the close button inside the dialog
    closeButtonRef.current?.focus();

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.close();
      document.body.style.overflow = originalOverflow;
      previousActiveElement.current?.focus();
    };
  }, [onClose]);

  const handleClickBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      onClose();
    }
  };

  return (
    <StyledDialog
      ref={dialogRef}
      onClick={handleClickBackdrop}
      aria-label={alt}
    >
      <Content>
        <CloseButton
          ref={closeButtonRef}
          aria-label="Close enlarged image"
          onClick={onClose}
        >×</CloseButton>
        <LargeImage src={src} alt={alt} />
      </Content>
    </StyledDialog>
  );
};

const ImageWithModal: FC<ImageWithModalProps> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <ThumbnailButton onClick={openModal} aria-label={"Enlarge image"}>
        <ThumbnailImage src={src} alt={alt} />
      </ThumbnailButton>
      {isOpen && <ImageModal src={src} alt={alt} onClose={closeModal} />}
    </>
  );
};

export default ImageWithModal;
