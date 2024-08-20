import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

import { createPortal } from "react-dom";
import Button from "./Button.tsx";

export type ModalHandle = {
  open: () => void;
};

type ModalProps = ComponentPropsWithoutRef<"dialog">;

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current!.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="bg-stone-900 p-8 rounded-3xl backdrop:bg-stone-100/70 shadow-2xl"
    >
      {children}
      <form method="dialog" className="mt-8 text-right">
        <Button>Close</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")!,
  );
});

export default Modal;
