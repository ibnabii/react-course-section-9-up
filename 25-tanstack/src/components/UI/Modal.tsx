import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  isOpen: boolean;
};

export default function Modal({ children, onClose, isOpen }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const modal = dialog.current;

    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!,
  );
}
