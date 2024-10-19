import { useRef, useEffect, ComponentPropsWithoutRef } from "react";
import { createPortal } from "react-dom";

function Modal({
  open,
  children,
  onClose,
}: ComponentPropsWithoutRef<"dialog">) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open && dialog.current) {
      dialog.current.showModal();
    } else if (dialog.current) {
      dialog.current.close();
    }
  }, [open]);

  // alternative approach to closing with cleanup function:
  //
  // useEffect(() => {
  //   const modal = dialog.current;
  //   if (open) {
  //     modal?.showModal();
  //   }
  //
  //   return () => modal?.close();
  // }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")!,
  );
}

export default Modal;
