import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & { children?: ReactNode };

export function Card({ className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...rest }: CardProps) {
  return (
    <div className={`px-5 pt-5 pb-3 ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-base font-semibold tracking-tight ${className}`} {...rest}>
      {children}
    </h3>
  );
}

export function CardContent({ className = "", children, ...rest }: CardProps) {
  return (
    <div className={`px-5 pb-5 ${className}`} {...rest}>
      {children}
    </div>
  );
}
