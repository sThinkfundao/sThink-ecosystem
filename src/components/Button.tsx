import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "quiet";

const BASE =
  "hit inline-flex items-center justify-center gap-2 rounded-sm text-ui font-bold " +
  "transition-colors duration-100 disabled:cursor-not-allowed disabled:opacity-50 " +
  "enabled:active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-steel px-4 py-2.5 text-ground enabled:hover:bg-ice enabled:active:bg-steel",
  secondary:
    "border border-edge bg-surface px-4 py-2.5 text-steel " +
    "enabled:hover:border-steel/40 enabled:hover:text-ice enabled:active:bg-panel",
  quiet:
    "px-2 py-1 text-teal enabled:hover:text-ice enabled:active:text-steel",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ variant = "secondary", className, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${BASE} ${VARIANTS[variant]}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
}
