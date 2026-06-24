import Link from "next/link";

const TYPES = [
  {
    emoji: "🎪",
    title: "Kermesse",
    body: "Stands, jeux enfants, buvette, tombola. Pour les écoles, paroisses, comités de quartier.",
    examples: ["Buvette softs", "Tombola", "Jeux enfants"],
  },
  {
    emoji: "🛍️",
    title: "Vide-grenier",
    body: "Emplacements exposants, café accueil, animation micro. Pour les comités, écoles, mairies.",
    examples: ["Emplacements exposants", "Café accueil", "Tombola"],
  },
  {
    emoji: "🍽️",
    title: "Repas annuel",
    body: "Salle, traiteur ou cuisine, animation musicale, photobooth. Pour clubs et amicales.",
    examples: ["Repas", "Animation musicale", "Photobooth"],
  },
  {
    emoji: "🤝",
    title: "Forum des associations",
    body: "Stands assos, démonstrations, accueil visiteurs. Pour mairies et fédérations.",
    examples: ["Stands associations", "Démonstrations", "Accueil visiteurs"],
  },
];

export function EventTypes() {
  return (
    <section id="types" className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-[6%]">
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">Couvert dès le MVP</p>
          <h2 className="font-heading text-[1.95rem] font-bold leading-[1.15] text-[color:var(--color-text-title)] md:text-[2.4rem]">
            Pensé pour les <span className="highlight">événements associatifs</span> les plus courants.
          </h2>
          <p className="text-[1.125rem] text-[color:var(--color-text-subtitle)]">
            Chaque format vient avec ses animations pré-paramétrées, ses ratios bénévoles et ses démarches administratives propres.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TYPES.map((type) => (
            <Link
              key={type.title}
              href={`/planner?type=${encodeURIComponent(type.title)}`}
              className="group rounded-2xl border border-[color:var(--color-border)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_10px_50px_0_rgba(49,107,242,0.2)]"
            >
              <div className="text-4xl">{type.emoji}</div>
              <h3 className="mt-4 font-heading text-xl font-semibold text-[color:var(--color-text-title)]">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-subtitle)]">{type.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {type.examples.map((ex) => (
                  <span key={ex} className="rounded-full bg-[color:var(--color-bg-blue)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-primary)]">
                    {ex}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold text-[color:var(--color-primary)] opacity-0 transition group-hover:opacity-100">Lancer ce format →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
