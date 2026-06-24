import { CheckCircle2, Euro, ShoppingCart, Users } from "lucide-react";
import type { ReactNode } from "react";

type Feature = { text: string };

type SplitProps = {
  eyebrow: string;
  headline: ReactNode;
  body: string;
  features: Feature[];
  imagePosition: "left" | "right";
  visual: ReactNode;
  bg?: "white" | "bg-blue";
};

export function Split({ eyebrow, headline, body, features, imagePosition, visual, bg = "white" }: SplitProps) {
  const bgClass = bg === "bg-blue" ? "bg-[color:var(--color-bg-blue)]" : "bg-white";
  return (
    <section className={`${bgClass} py-20`}>
      <div className="mx-auto max-w-[1280px] px-[6%]">
        <div className={`grid items-center gap-12 md:grid-cols-2 ${imagePosition === "left" ? "md:[&>div:first-child]:order-2" : ""}`}>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">{eyebrow}</p>
            <h2 className="font-heading text-[1.95rem] font-bold leading-[1.15] text-[color:var(--color-text-title)] md:text-[2.4rem]">
              {headline}
            </h2>
            <p className="text-[1.125rem] leading-[1.65] text-[color:var(--color-text-subtitle)]">{body}</p>
            <ul className="space-y-3 pt-2">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--color-primary)]" />
                  <span className="text-[color:var(--color-text-subtitle)]">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}

export function BudgetVisual() {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_10px_50px_0_rgba(49,107,242,0.15)]">
      <div className="mb-4 flex items-center gap-2 text-[color:var(--color-text-title)]">
        <Euro className="h-5 w-5 text-[color:var(--color-primary)]" />
        <p className="font-heading font-semibold">Budget simplifié</p>
      </div>
      <div className="space-y-3">
        {[
          { label: "Budget de départ", value: "800 €", color: "bg-[color:var(--color-bg-strip)]" },
          { label: "Argent qui rentre", value: "+ 1 956 €", color: "bg-[color:var(--color-primary-20)]" },
          { label: "Dépenses", value: "− 1 144 €", color: "bg-[color:var(--color-bg-grey)]" },
          { label: "Argent restant estimé", value: "612 €", color: "bg-emerald-50", emph: true },
        ].map((row) => (
          <div key={row.label} className={`flex items-center justify-between rounded-xl ${row.color} px-4 py-3`}>
            <span className="text-sm text-[color:var(--color-text-subtitle)]">{row.label}</span>
            <span className={`font-heading font-semibold ${row.emph ? "text-emerald-700 text-lg" : "text-[color:var(--color-text-title)]"}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VolunteerVisual() {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_10px_50px_0_rgba(49,107,242,0.15)]">
      <div className="mb-4 flex items-center gap-2 text-[color:var(--color-text-title)]">
        <Users className="h-5 w-5 text-[color:var(--color-primary)]" />
        <p className="font-heading font-semibold">Staffing recommandé</p>
      </div>
      <div className="space-y-2">
        {[
          ["Coordination", 1],
          ["Accueil et caisse", 3],
          ["Buvette / restauration", 4],
          ["Animations et stands", 4],
          ["Installation / rangement", 2],
        ].map(([role, count]) => (
          <div key={role as string} className="flex items-center justify-between rounded-lg bg-[color:var(--color-bg-strip)] px-4 py-3">
            <span className="text-sm font-medium text-[color:var(--color-text-title)]">{role}</span>
            <span className="rounded-full bg-[color:var(--color-primary)] px-3 py-0.5 text-xs font-semibold text-white">{count} pers.</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShoppingVisual() {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_10px_50px_0_rgba(49,107,242,0.15)]">
      <div className="mb-4 flex items-center gap-2 text-[color:var(--color-text-title)]">
        <ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)]" />
        <p className="font-heading font-semibold">Liste de courses estimée</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Eau", qty: "30 packs", price: "63 €" },
          { title: "Sodas", qty: "36 bouteilles", price: "135 €" },
          { title: "Gobelets", qty: "200 unités", price: "54 €" },
          { title: "Sandwichs", qty: "100 portions", price: "432 €" },
        ].map((item) => (
          <div key={item.title} className="rounded-xl bg-[color:var(--color-bg-strip)] p-3">
            <p className="font-heading font-semibold text-[color:var(--color-text-title)]">{item.title}</p>
            <p className="text-xs text-[color:var(--color-text-muted)]">{item.qty}</p>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-primary)]">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
