import Image from "next/image";
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
            <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[color:var(--color-primary-20)] blur-2xl" />
            <div className="mb-3 flex justify-end">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--color-primary)] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> MVP gratuit pour les associations
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] shadow-[0_10px_50px_0_rgba(49,107,242,0.25)]">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                alt="Bénévoles et organisateurs d'un événement associatif"
                width={1200}
                height={900}
                className="h-[420px] w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute left-4 right-4 bottom-4 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-md backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-[color:var(--color-text-muted)]">Votre événement</p>
                    <p className="truncate font-heading text-base font-semibold text-[color:var(--color-text-title)]">Kermesse de l&apos;école Jean Moulin</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Bien parti</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "Bénéfices", value: "+ 612 €", color: "text-emerald-700" },
                    { label: "Min. sans perte", value: "112", color: "text-[color:var(--color-primary)]" },
                    { label: "Bénévoles", value: "12/14", color: "text-emerald-700" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-[color:var(--color-bg-strip)] px-2 py-1.5">
                      <p className="text-[10px] text-[color:var(--color-text-muted)]">{stat.label}</p>
                      <p className={`font-heading text-sm font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
