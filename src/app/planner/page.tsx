import OneDayEventPlanner from "@/components/OneDayEventPlanner";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Planifier mon événement · One Day Event Planner",
};

export default function PlannerPage() {
  return (
    <>
      <Nav />
      <OneDayEventPlanner />
      <Footer />
    </>
  );
}
