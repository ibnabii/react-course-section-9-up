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

type ModalProps = {
  onConfirm: () => void;
} & ComponentPropsWithoutRef<"dialog">;

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { onConfirm, children },
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
      <div className="flex justify-between">
        <Button onClick={onConfirm}>Yes</Button>
        <form method="dialog">
          <Button>Cancel</Button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
});

export default Modal;
