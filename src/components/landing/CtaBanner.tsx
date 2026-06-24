import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1280px] px-[6%]">
        <div
          className="rounded-[20px] px-8 py-16 text-center"
          style={{
            background: "radial-gradient(106.41% 128.47% at 50.15% 128.47%, #23abff, #3066ff)",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">Prêt à se lancer ?</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-heading text-[2rem] font-bold leading-[1.15] text-white md:text-[2.4rem]">
            En 2 minutes, votre événement passe de l&apos;intuition à un <span className="highlight-on-dark highlight">plan concret</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-[1.6] text-white/90">
            Lancez le wizard, partagez le lien à votre bureau, et arrivez en réunion avec un budget clair, un staffing chiffré et les démarches à vérifier.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/planner">
              <Button variant="yellow" size="lg">Créer mon plan gratuitement</Button>
            </Link>
            <Link href="#fonctionnalites">
              <Button variant="white" size="lg">Voir les fonctionnalités</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
