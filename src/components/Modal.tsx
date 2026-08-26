import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

/** Thin wrapper over native <dialog>: focus containment and Escape for free. */
export default function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onPointerDown={(e) => {
        pressedBackdrop.current = e.target === ref.current;
      }}
      onClick={(e) => {
        // Close only when the press started and ended on the backdrop, so
        // a text selection that ends outside the panel doesn't dismiss it.
        if (e.target === ref.current && pressedBackdrop.current) ref.current.close();
      }}
      aria-labelledby={labelledBy}
      className="overlay m-auto w-[min(92vw,380px)] rounded-md p-0 text-steel backdrop:bg-ground/70"
    >
      {children}
    </dialog>
  );
}
