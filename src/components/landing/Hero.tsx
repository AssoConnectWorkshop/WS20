import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKLIST = [
  "Gestion claire de votre budget",
  "Gestion de vos bénévoles",
  "Démarches administratives en règle",
];

export function Hero() {
  return (
    <section
      className="relative -mt-20 pt-32 pb-24"
      style={{ background: "linear-gradient(to bottom, #E6EDFD, #ffffff 11.765rem)" }}
    >
      <div className="mx-auto max-w-[1280px] px-[6%]">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <h1 className="font-heading text-[2.4rem] font-bold leading-[1.15] tracking-[0.5px] text-[color:var(--color-text-title)] md:text-[3rem] md:leading-[1.1]">
              Organisez votre événement associatif avec un{" "}
              <span className="highlight">plan d&apos;action</span>{" "}
              complet.
            </h1>
            <p className="max-w-[540px] text-[1.125rem] leading-[1.65] text-[color:var(--color-text-subtitle)]">
              En 2 minutes, votre association sait si son événement est réaliste, combien de bénévoles prévoir, quoi acheter et quoi faire cette semaine.
            </p>
            <ul className="space-y-2">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[color:var(--color-text-subtitle)]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--color-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/planner">
                <Button size="lg">Commencer</Button>
              </Link>
              <Link href="#fonctionnalites">
                <Button variant="secondary" size="lg">Découvrir comment ça marche</Button>
              </Link>
            </div>
            <p className="font-hand text-2xl text-[color:var(--color-primary)]">
              Aucune inscription, aucune carte bancaire.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-[color:var(--color-primary-20)] blur-2xl" />
            <div className="mb-3 flex justify-end">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--color-primary)] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> MVP gratuit pour les associations
              </div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_10px_50px_0_rgba(49,107,242,0.2)]">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-[color:var(--color-text-muted)]">Votre événement</p>
                  <p className="truncate font-heading text-xl font-semibold text-[color:var(--color-text-title)]">Kermesse de l&apos;école Jean Moulin</p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Bien parti</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-strip)] p-3">
                  <p className="text-xs text-[color:var(--color-text-muted)]">Bénéfices</p>
                  <p className="font-heading text-xl font-bold text-emerald-700">+ 612 €</p>
                </div>
                <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-strip)] p-3">
                  <p className="text-xs text-[color:var(--color-text-muted)]">Min. sans perte</p>
                  <p className="font-heading text-xl font-bold text-[color:var(--color-primary)]">112</p>
                </div>
                <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-strip)] p-3">
                  <p className="text-xs text-[color:var(--color-text-muted)]">Bénévoles</p>
                  <p className="font-heading text-xl font-bold text-emerald-700">12/14</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">Les 3 priorités</p>
                {["Confirmer les bénévoles disponibles", "Vérifier assurance + mairie", "Acheter les boissons et gobelets"].map((p) => (
                  <div key={p} className="flex items-center gap-2 rounded-lg bg-[color:var(--color-bg-blue)] px-3 py-2 text-sm text-[color:var(--color-text-title)]">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--color-primary)]" /> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
