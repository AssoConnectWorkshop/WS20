import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "yellow";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-hover)] shadow-sm",
  secondary:
    "bg-transparent text-[color:var(--color-primary)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-20)]",
  ghost:
    "bg-transparent text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-20)]",
  white:
    "bg-white text-[color:var(--color-text-title)] border border-[color:var(--color-border)] hover:bg-[color:var(--color-bg-grey)]",
  yellow:
    "bg-[color:var(--color-yellow)] text-[color:var(--color-text-title)] hover:bg-[color:var(--color-yellow-hover)] shadow-sm",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[50px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  return (
    <button className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
