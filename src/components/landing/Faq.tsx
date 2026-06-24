"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "Faut-il créer un compte pour utiliser l'app ?",
    a: "Non. One Day Event Planner fonctionne entièrement côté navigateur : pas de compte, pas de carte bancaire, aucune donnée sauvegardée sur un serveur. Votre plan vit dans l'URL partageable que vous générez.",
  },
  {
    q: "Les chiffres sont-ils fiables pour mon événement ?",
    a: "Les estimations sont calibrées sur des ordres de grandeur typiques pour chaque type d'événement et chaque animation. Elles vous donnent un point de départ réaliste — à ajuster avec vos devis et vos contraintes locales.",
  },
  {
    q: "Comment partager le plan avec mon bureau ou mes bénévoles ?",
    a: "Une fois votre plan généré, le bouton 'Copier le lien partageable' encode toute votre configuration dans l'URL. Envoyez ce lien : la personne qui l'ouvre voit exactement le même plan.",
  },
  {
    q: "Et pour l'alcool, la SACEM, l'assurance ?",
    a: "Si vous sélectionnez une animation alcool, un avertissement apparaît pour la buvette temporaire. La checklist administrative inclut les démarches habituelles (mairie, assurance, SACEM si musique). À vérifier toujours auprès de votre mairie.",
  },
  {
    q: "Est-ce que c'est lié à AssoConnect ?",
    a: "C'est un MVP construit sur la stack AssoConnect (Next.js, Tailwind, Vercel) avec son design system. L'app ne dépend d'aucune API AssoConnect côté utilisateur.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[color:var(--color-bg-blue)] py-20">
      <div className="mx-auto max-w-[820px] px-[6%]">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">FAQ</p>
          <h2 className="font-heading text-[1.95rem] font-bold leading-[1.15] text-[color:var(--color-text-title)] md:text-[2.4rem]">
            Vos <span className="highlight">questions</span>, nos réponses.
          </h2>
        </div>
        <div className="space-y-3">
          {ITEMS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-heading text-base font-semibold text-[color:var(--color-text-title)]">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[color:var(--color-primary)] transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`grid transition-all ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[color:var(--color-text-subtitle)]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
