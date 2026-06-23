import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-dark)] shadow-sm",
  outline:
    "border border-[color:var(--color-border)] bg-white text-[color:var(--color-foreground)] hover:bg-[color:var(--color-muted)]",
  ghost:
    "text-[color:var(--color-foreground)] hover:bg-[color:var(--color-muted)]",
  subtle:
    "bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary-dark)] hover:bg-[color:var(--color-primary-soft)]/80",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  return (
    <button className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
