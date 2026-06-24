import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Split, BudgetVisual, VolunteerVisual, ShoppingVisual } from "@/components/landing/Split";
import { EventTypes } from "@/components/landing/EventTypes";
import { Faq } from "@/components/landing/Faq";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="fonctionnalites" aria-hidden className="h-0" />
        <Split
          eyebrow="Gestion claire de votre budget"
          headline={<>Un budget <span className="highlight">clair</span> pour tous.</>}
          body="Recette, dépenses, bénéfices : on parle comme une association, pas comme un cabinet comptable. Vous voyez immédiatement si l'événement est réaliste."
          features={[
            { text: "Bénéfices estimés, mis à jour en temps réel" },
            { text: "Participants minimum sans perte" },
            { text: "Scénarios pessimiste, actuel, optimiste" },
          ]}
          imagePosition="right"
          visual={<BudgetVisual />}
        />
        <Split
          eyebrow="Gestion de vos bénévoles"
          headline={<>Le bon nombre de <span className="highlight">bénévoles</span>.</>}
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
          eyebrow="Logistique"
          headline={<>Une liste de courses <span className="highlight">prête</span>.</>}
          body="Plus besoin de partir de la mémoire du président précédent. Nourriture, softs, location, animations : tout est estimé en quantité et en budget."
          features={[
            { text: "Liste par catégorie avec budget estimé" },
            { text: "Quantités calculées sur vos participants" },
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
