"use client";

import type { CSSProperties, ReactElement } from "react";
import { ResponsiveContainer, Tooltip } from "recharts";

export type ChartConfig = Record<string, { label: string; color: string }>;

type ChartContainerProps = {
  config: ChartConfig;
  className?: string;
  children: ReactElement;
};

export function ChartContainer({ config, className = "", children }: ChartContainerProps) {
  const style: CSSProperties = {};
  for (const [key, entry] of Object.entries(config)) {
    (style as Record<string, string>)[`--color-${key}`] = entry.color;
  }
  return (
    <div className={className} style={style}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

type ChartTooltipProps = {
  content: ReactElement;
  cursor?: boolean;
};

export function ChartTooltip(props: ChartTooltipProps) {
  return <Tooltip cursor={props.cursor ?? { fill: "rgba(0,0,0,0.04)" }} content={props.content} />;
}

type TooltipItem = {
  value?: number | string | ReadonlyArray<number | string>;
  name?: string | number;
  color?: string;
};

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: ReadonlyArray<TooltipItem>;
  label?: string | number;
};

export function ChartTooltipContent(props: ChartTooltipContentProps) {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm shadow-md">
      {label !== undefined && (
        <p className="mb-1 font-semibold text-[color:var(--color-foreground)]">{String(label)}</p>
      )}
      <div className="space-y-1">
        {payload.map((item, index) => {
          const raw = item.value;
          const numeric = typeof raw === "number" ? raw : null;
          const formatted =
            numeric !== null
              ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(numeric)
              : String(raw ?? "");
          return (
            <div key={index} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color ?? "var(--color-primary)" }} />
              <span className="text-[color:var(--color-muted-foreground)]">{String(item.name ?? "")}</span>
              <span className="ml-auto font-medium">{formatted}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
