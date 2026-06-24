import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Split, BudgetVisual, VolunteerVisual, ShoppingVisual } from "@/components/landing/Split";
import { EventTypes } from "@/components/landing/EventTypes";
import { Faq } from "@/components/landing/Faq";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="fonctionnalites">
        <Hero />
        <Stats />
        <Split
          eyebrow="Budget clair"
          headline={<>Un budget que <span className="highlight">tout le monde comprend</span>, sans jargon financier.</>}
          body="Argent qui rentre, dépenses, argent restant : on parle comme une association, pas comme un cabinet comptable. Vous voyez immédiatement si l'événement est réaliste."
          features={[
            { text: "Argent restant estimé, mis à jour en temps réel" },
            { text: "Participants minimum sans perte" },
            { text: "Scénarios pessimiste, actuel, optimiste" },
          ]}
          imagePosition="right"
          visual={<BudgetVisual />}
        />
        <Split
          eyebrow="Bénévoles"
          headline={<>Le bon nombre de <span className="highlight">bénévoles</span>, sans sur-mobiliser ni sous-staffer.</>}
          body="On part du nombre de participants et des animations choisies pour vous proposer une répartition par rôle. Vous voyez instantanément où vous êtes en sous-effectif."
          features={[
            { text: "Recommandation par rôle : caisse, buvette, animation, rangement" },
            { text: "Comparaison disponibles vs recommandés" },
            { text: "Slider pour ajuster en direct" },
          ]}
          imagePosition="left"
          visual={<VolunteerVisual />}
          bg="bg-blue"
        />
        <Split
          eyebrow="Logistique et démarches"
          headline={<>Une <span className="highlight">liste de courses</span> et les démarches admin, déjà dégrossies.</>}
          body="Plus besoin de partir de la mémoire du président précédent. Nourriture, softs, location, animations : tout est estimé en quantité et en budget."
          features={[
            { text: "Liste de courses par catégorie avec budget estimé" },
            { text: "Checklist administrative selon le format" },
            { text: "Alerte buvette temporaire si vous servez de l'alcool" },
          ]}
          imagePosition="right"
          visual={<ShoppingVisual />}
        />
        <EventTypes />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
