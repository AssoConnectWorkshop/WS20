const STATS = [
  { value: "2 min", label: "pour obtenir un plan complet" },
  { value: "4", label: "types d'événements couverts" },
  { value: "24", label: "animations modélisées" },
  { value: "0 €", label: "aucun frais, aucune inscription" },
];

export function Stats() {
  return (
    <section className="bg-[color:var(--color-bg-strip)] py-16">
      <div className="mx-auto max-w-[1280px] px-[6%]">
        <div className="grid gap-8 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="font-heading text-[2.4rem] font-bold leading-tight text-[color:var(--color-primary)]">{stat.value}</p>
              <p className="text-sm text-[color:var(--color-text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
