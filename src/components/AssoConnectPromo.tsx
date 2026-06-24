import { ArrowUpRight, CreditCard, Ticket, Sparkles } from "lucide-react";

type PromoVariant = "billetterie" | "tap-to-pay" | "global";

type PromoCardProps = {
  variant: PromoVariant;
};

const CONFIG: Record<PromoVariant, {
  href: string;
  badge: string;
  title: string;
  body: string;
  cta: string;
  Icon: typeof CreditCard;
  bg: string;
}> = {
  billetterie: {
    href: "https://www.assoconnect.com/fonctionnalites/billetterie-association/",
    badge: "Recommandé pour vous",
    title: "Billetterie AssoConnect",
    body: "Vendez vos billets en ligne, suivez les inscriptions et imprimez la liste d'émargement automatiquement.",
    cta: "Découvrir la billetterie",
    Icon: Ticket,
    bg: "linear-gradient(135deg, #316bf2 0%, #0040d7 100%)",
  },
  "tap-to-pay": {
    href: "https://www.assoconnect.com/paiements/tap-to-pay/",
    badge: "Pour encaisser le jour J",
    title: "Tap to Pay AssoConnect",
    body: "Encaissez la buvette, la tombola et les ventes avec un simple iPhone. Sans terminal, sans frais d'abonnement.",
    cta: "Découvrir Tap to Pay",
    Icon: CreditCard,
    bg: "linear-gradient(135deg, #2a2d4a 0%, #316bf2 100%)",
  },
  global: {
    href: "https://www.assoconnect.com/tarifs/",
    badge: "Solution complète",
    title: "Toute la suite AssoConnect",
    body: "CRM adhérents, compta, site web, mailing. Une seule plateforme pour faire tourner votre association.",
    cta: "Voir nos offres",
    Icon: Sparkles,
    bg: "linear-gradient(135deg, #87dfd5 0%, #316bf2 100%)",
  },
};

export function AssoConnectPromoCard({ variant }: PromoCardProps) {
  const { href, badge, title, body, cta, Icon, bg } = CONFIG[variant];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl text-white shadow-[0_10px_40px_0_rgba(49,107,242,0.25)] transition hover:-translate-y-1"
      style={{ background: bg }}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" aria-hidden />
      <div className="relative p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm">
            <Sparkles className="h-3 w-3" /> {badge}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 font-heading text-lg font-bold leading-tight" style={{ color: "#ffffff" }}>{title}</p>
        <p className="mt-1.5 text-sm leading-snug text-white/90">{body}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition group-hover:gap-2">
          {cta} <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}

type PromoStripProps = {
  showBilletterie: boolean;
  showTapToPay: boolean;
  showGlobal?: boolean;
  layout?: "stack" | "row";
};

export function AssoConnectPromoStrip({ showBilletterie, showTapToPay, showGlobal, layout = "stack" }: PromoStripProps) {
  const cards: PromoVariant[] = [];
  if (showBilletterie) cards.push("billetterie");
  if (showTapToPay) cards.push("tap-to-pay");
  if (showGlobal) cards.push("global");
  if (cards.length === 0) cards.push("global");
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
        <Sparkles className="h-3.5 w-3.5" /> Boostez votre événement
      </div>
      <div className={layout === "row" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
        {cards.map((variant) => (
          <AssoConnectPromoCard key={variant} variant={variant} />
        ))}
      </div>
    </div>
  );
}
