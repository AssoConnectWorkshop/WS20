"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clipboard,
  Euro,
  Lightbulb,
  PartyPopper,
  Share2,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type EventType = "Kermesse" | "Vide-grenier" | "Repas annuel" | "Forum des associations";
type Status = "green" | "orange" | "red";

type AnimationOption = {
  label: string;
  revenuePerParticipant: number;
  fixedRevenue: number;
  fixedCost: number;
  variableCost: number;
  volunteerBoost: number;
};

type PlannerInput = {
  eventName: string;
  eventType: EventType;
  date: string;
  startingBudget: number;
  expectedParticipants: number;
  isFree: boolean;
  ticketPrice: number;
  availableVolunteers: number;
  hasSponsors: boolean;
  selectedAnimations: string[];
};

type EventConfig = {
  baseVariableCost: number;
  baseFixedCost: number;
  sponsorRevenue: number;
  volunteerRatio: number;
  animations: AnimationOption[];
  admin: string[];
  tips: string[];
};

const TYPE_CONFIG: Record<EventType, EventConfig> = {
  Kermesse: {
    baseVariableCost: 2.2,
    baseFixedCost: 420,
    sponsorRevenue: 350,
    volunteerRatio: 18,
    animations: [
      { label: "Buvette softs", revenuePerParticipant: 4.2, fixedRevenue: 0, fixedCost: 70, variableCost: 1.5, volunteerBoost: 2 },
      { label: "Tombola", revenuePerParticipant: 2.5, fixedRevenue: 0, fixedCost: 120, variableCost: 0.2, volunteerBoost: 1 },
      { label: "Jeux enfants", revenuePerParticipant: 1.8, fixedRevenue: 0, fixedCost: 90, variableCost: 0.4, volunteerBoost: 2 },
      { label: "Buvette alcool", revenuePerParticipant: 2.8, fixedRevenue: 0, fixedCost: 160, variableCost: 1.1, volunteerBoost: 1 },
      { label: "Stand maquillage", revenuePerParticipant: 1.2, fixedRevenue: 0, fixedCost: 65, variableCost: 0.3, volunteerBoost: 1 },
      { label: "Sono et mini scène", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 140, variableCost: 0, volunteerBoost: 1 },
    ],
    admin: ["Valider l'utilisation du lieu avec la mairie", "Vérifier que l'assurance couvre bien l'événement", "Déclarer la musique à la SACEM si sono ou animation musicale", "Prévoir un référent sécurité et premiers secours"],
    tips: ["Prévoir assez de bénévoles sur les stands enfants et clarifier les règles de caisse", "Séparer caisse, buvette et jeux pour fluidifier le passage", "Prévoir un plan B en cas de pluie ou d'absence de bénévoles", "Afficher les prix très clairement pour éviter les hésitations"],
  },
  "Vide-grenier": {
    baseVariableCost: 1.4,
    baseFixedCost: 360,
    sponsorRevenue: 250,
    volunteerRatio: 25,
    animations: [
      { label: "Café accueil", revenuePerParticipant: 2, fixedRevenue: 0, fixedCost: 55, variableCost: 0.7, volunteerBoost: 1 },
      { label: "Buvette softs", revenuePerParticipant: 3.5, fixedRevenue: 0, fixedCost: 70, variableCost: 1.3, volunteerBoost: 2 },
      { label: "Emplacements exposants", revenuePerParticipant: 2.5, fixedRevenue: 180, fixedCost: 45, variableCost: 0.1, volunteerBoost: 2 },
      { label: "Tombola", revenuePerParticipant: 0.8, fixedRevenue: 0, fixedCost: 80, variableCost: 0.1, volunteerBoost: 1 },
      { label: "Animation micro", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 90, variableCost: 0, volunteerBoost: 1 },
      { label: "Buvette alcool", revenuePerParticipant: 2.2, fixedRevenue: 0, fixedCost: 160, variableCost: 0.9, volunteerBoost: 1 },
    ],
    admin: ["Déclarer la vente au déballage en mairie", "Tenir un registre des exposants", "Vérifier que l'assurance couvre bien l'événement", "Prévoir les règles de stationnement et l'accès secours"],
    tips: ["Ouvrir l'installation exposants très tôt", "Numéroter les emplacements avant le jour J", "Prévoir de la monnaie dès l'ouverture", "Clarifier les règles pour les exposants particuliers et professionnels"],
  },
  "Repas annuel": {
    baseVariableCost: 9,
    baseFixedCost: 620,
    sponsorRevenue: 300,
    volunteerRatio: 16,
    animations: [
      { label: "Repas", revenuePerParticipant: 14, fixedRevenue: 0, fixedCost: 120, variableCost: 6, volunteerBoost: 3 },
      { label: "Buvette softs", revenuePerParticipant: 3, fixedRevenue: 0, fixedCost: 60, variableCost: 1, volunteerBoost: 1 },
      { label: "Animation musicale", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 180, variableCost: 0, volunteerBoost: 1 },
      { label: "Buvette alcool", revenuePerParticipant: 3.2, fixedRevenue: 0, fixedCost: 180, variableCost: 1.2, volunteerBoost: 1 },
      { label: "Tombola", revenuePerParticipant: 1.5, fixedRevenue: 0, fixedCost: 100, variableCost: 0.1, volunteerBoost: 1 },
      { label: "Photobooth", revenuePerParticipant: 0.8, fixedRevenue: 0, fixedCost: 90, variableCost: 0.2, volunteerBoost: 1 },
    ],
    admin: ["Réserver la salle", "Vérifier assurance et capacité maximale", "Déclarer la musique à la SACEM si animation", "Vérifier les règles d'hygiène alimentaire"],
    tips: ["Figer le nombre de repas à J-7", "Séparer service, cuisine et caisse", "Prévoir 10% de marge sur boissons non alcoolisées", "Identifier une personne responsable de la caisse toute la soirée"],
  },
  "Forum des associations": {
    baseVariableCost: 2,
    baseFixedCost: 560,
    sponsorRevenue: 500,
    volunteerRatio: 22,
    animations: [
      { label: "Accueil visiteurs", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 50, variableCost: 0.2, volunteerBoost: 2 },
      { label: "Stands associations", revenuePerParticipant: 0.8, fixedRevenue: 250, fixedCost: 90, variableCost: 0.2, volunteerBoost: 3 },
      { label: "Micro annonces", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 110, variableCost: 0, volunteerBoost: 1 },
      { label: "Démonstrations", revenuePerParticipant: 0.5, fixedRevenue: 0, fixedCost: 120, variableCost: 0.1, volunteerBoost: 2 },
      { label: "Buvette softs", revenuePerParticipant: 2.8, fixedRevenue: 0, fixedCost: 65, variableCost: 1, volunteerBoost: 2 },
      { label: "Espace inscriptions", revenuePerParticipant: 0, fixedRevenue: 0, fixedCost: 45, variableCost: 0.1, volunteerBoost: 1 },
    ],
    admin: ["Confirmer la mise à disposition du lieu", "Vérifier assurance organisateur", "Valider sécurité et accès PMR", "Prévoir autorisation buvette si nécessaire"],
    tips: ["Créer un parcours visiteur très lisible", "Regrouper les stands par thème", "Prévoir un point accueil central visible", "Nommer une personne référente pour les associations exposantes"],
  },
};

const DEFAULT_INPUT: PlannerInput = {
  eventName: "Kermesse de l'école Jean Moulin",
  eventType: "Kermesse",
  date: "2026-09-20",
  startingBudget: 800,
  expectedParticipants: 180,
  isFree: false,
  ticketPrice: 4,
  availableVolunteers: 12,
  hasSponsors: true,
  selectedAnimations: TYPE_CONFIG.Kermesse.animations.slice(0, 3).map((animation) => animation.label),
};

const chartConfig = {
  amount: { label: "Montant", color: "var(--color-primary)" },
} satisfies ChartConfig;

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function formatDate(date: string) {
  if (!date) return "Date à définir";
  return new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

function addDays(date: string, days: number) {
  const base = date ? new Date(date) : new Date();
  base.setDate(base.getDate() + days);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(base);
}

function getSelectedAnimationObjects(input: PlannerInput) {
  return TYPE_CONFIG[input.eventType].animations.filter((animation) => input.selectedAnimations.includes(animation.label));
}

function hasAlcohol(input: PlannerInput) {
  return input.selectedAnimations.some((animation) => animation.toLowerCase().includes("alcool"));
}

function calculatePlan(input: PlannerInput, participantsOverride?: number, volunteersOverride?: number) {
  const participants = participantsOverride ?? input.expectedParticipants;
  const volunteers = volunteersOverride ?? input.availableVolunteers;
  const config = TYPE_CONFIG[input.eventType];
  const selectedAnimations = getSelectedAnimationObjects(input);
  const ticketRevenue = input.isFree ? 0 : participants * input.ticketPrice;
  const sponsorRevenue = input.hasSponsors ? config.sponsorRevenue : 0;
  const animationRevenue = selectedAnimations.reduce((sum, animation) => sum + animation.fixedRevenue + participants * animation.revenuePerParticipant, 0);
  const animationFixedCost = selectedAnimations.reduce((sum, animation) => sum + animation.fixedCost, 0);
  const animationVariableCost = selectedAnimations.reduce((sum, animation) => sum + participants * animation.variableCost, 0);
  const animationVolunteers = selectedAnimations.reduce((sum, animation) => sum + animation.volunteerBoost, 0);
  const totalRevenue = ticketRevenue + sponsorRevenue + animationRevenue;
  const totalCosts = config.baseFixedCost + participants * config.baseVariableCost + animationFixedCost + animationVariableCost;
  const net = input.startingBudget + totalRevenue - totalCosts;
  const revenuePerParticipant = (input.isFree ? 0 : input.ticketPrice) + selectedAnimations.reduce((sum, animation) => sum + animation.revenuePerParticipant, 0);
  const variableCostPerParticipant = config.baseVariableCost + selectedAnimations.reduce((sum, animation) => sum + animation.variableCost, 0);
  const marginPerParticipant = Math.max(0.1, revenuePerParticipant - variableCostPerParticipant);
  const minimumParticipants = Math.max(0, Math.ceil((config.baseFixedCost + animationFixedCost - input.startingBudget - sponsorRevenue - selectedAnimations.reduce((sum, animation) => sum + animation.fixedRevenue, 0)) / marginPerParticipant));
  const recommendedVolunteers = Math.max(4, Math.ceil(participants / config.volunteerRatio) + Math.ceil(animationVolunteers * 0.7));
  const volunteerGap = volunteers - recommendedVolunteers;
  const budgetStatus: Status = net >= 300 ? "green" : net >= 0 ? "orange" : "red";
  const volunteerStatus: Status = volunteerGap >= 2 ? "green" : volunteerGap >= 0 ? "orange" : "red";
  const globalStatus: Status = budgetStatus === "green" && volunteerStatus !== "red" ? "green" : budgetStatus === "red" || volunteerStatus === "red" ? "red" : "orange";

  return {
    participants,
    volunteers,
    ticketRevenue,
    sponsorRevenue,
    animationRevenue,
    totalRevenue,
    totalCosts,
    net,
    minimumParticipants,
    recommendedVolunteers,
    volunteerGap,
    budgetStatus,
    volunteerStatus,
    globalStatus,
    selectedAnimations,
  };
}

function getAnimationRows(input: PlannerInput, participants: number) {
  return getSelectedAnimationObjects(input).map((animation) => ({
    label: animation.label,
    revenue: animation.fixedRevenue + participants * animation.revenuePerParticipant,
    cost: animation.fixedCost + participants * animation.variableCost,
  }));
}

function getShoppingList(input: PlannerInput, participants: number) {
  const selected = input.selectedAnimations;
  const foodSelected = selected.some((item) => item.includes("Buvette") || item === "Repas" || item.includes("Café"));
  const alcoholSelected = hasAlcohol(input);
  const mealSelected = selected.includes("Repas");
  const softItems = foodSelected
    ? [
        { label: "Eau", quantity: `${Math.ceil(participants / 6)} packs`, budget: participants * 0.35 },
        { label: "Sodas et jus", quantity: `${Math.ceil(participants / 5)} bouteilles`, budget: participants * 0.75 },
        { label: "Gobelets et serviettes", quantity: `${Math.ceil(participants * 1.1)} unités`, budget: participants * 0.3 },
      ]
    : [];
  const foodItems = mealSelected
    ? [
        { label: "Repas ou traiteur", quantity: `${Math.ceil(participants * 1.02)} portions`, budget: participants * 11 },
        { label: "Pain et accompagnements", quantity: `${Math.ceil(participants / 4)} lots`, budget: participants * 1.4 },
        { label: "Desserts", quantity: `${Math.ceil(participants * 0.9)} portions`, budget: participants * 2.2 },
      ]
    : foodSelected
      ? [
          { label: "Sandwichs et snacks", quantity: `${Math.ceil(participants * 0.55)} portions`, budget: participants * 2.4 },
          { label: "Chips et grignotage", quantity: `${Math.ceil(participants / 8)} paquets`, budget: participants * 0.5 },
          { label: "Café et thé", quantity: `${Math.ceil(participants / 30)} lots`, budget: participants * 0.2 },
        ]
      : [];
  const alcoholItems = alcoholSelected
    ? [
        { label: "Bière", quantity: `${Math.ceil(participants * 0.45)} unités`, budget: participants * 0.9 },
        { label: "Vin", quantity: `${Math.ceil(participants / 8)} bouteilles`, budget: participants * 0.8 },
        { label: "Éco-cups", quantity: `${Math.ceil(participants * 0.8)} unités`, budget: participants * 0.35 },
      ]
    : [];
  const rentalItems = [
    { label: "Tables", quantity: `${Math.ceil(participants / 8)} unités`, budget: Math.ceil(participants / 8) * 8 },
    { label: mealSelected ? "Chaises" : "Bancs ou mange-debout", quantity: `${Math.ceil(participants / 2)} places`, budget: Math.ceil(participants / 2) * 1.5 },
    { label: "Barnums ou zone abritée", quantity: `${Math.max(1, Math.ceil(participants / 80))} unité(s)`, budget: Math.max(1, Math.ceil(participants / 80)) * 65 },
    { label: "Sono ou micro", quantity: selected.some((item) => item.includes("Sono") || item.includes("Micro") || item.includes("musicale")) ? "À prévoir" : "Optionnel", budget: selected.some((item) => item.includes("Sono") || item.includes("Micro") || item.includes("musicale")) ? 120 : 0 },
  ];
  const animationItems = selected.map((animation) => ({ label: animation, quantity: "Kit animation", budget: animation.includes("Tombola") ? 120 : 35 }));

  return [
    { category: "Nourriture", items: foodItems },
    { category: "Softs", items: softItems },
    { category: "Alcool", items: alcoholItems },
    { category: "Location", items: rentalItems },
    { category: "Animations", items: animationItems },
  ].filter((group) => group.items.length > 0);
}

function statusClasses(status: Status) {
  if (status === "green") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "orange") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-red-200 bg-red-50 text-red-800";
}

function statusLabel(status: Status) {
  if (status === "green") return "Bien parti";
  if (status === "orange") return "À sécuriser";
  return "À revoir avant de lancer";
}

function encodeShare(input: PlannerInput, adjustedParticipants: number, adjustedVolunteers: number) {
  return btoa(encodeURIComponent(JSON.stringify({ ...input, expectedParticipants: adjustedParticipants, availableVolunteers: adjustedVolunteers })));
}

function decodeShare(value: string): PlannerInput | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(value))) as PlannerInput;
    if (!parsed.eventType || !TYPE_CONFIG[parsed.eventType]) return null;
    return { ...DEFAULT_INPUT, ...parsed };
  } catch {
    return null;
  }
}

export default function OneDayEventPlanner() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<PlannerInput>(DEFAULT_INPUT);
  const [adjustedParticipants, setAdjustedParticipants] = useState(DEFAULT_INPUT.expectedParticipants);
  const [adjustedVolunteers, setAdjustedVolunteers] = useState(DEFAULT_INPUT.availableVolunteers);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("plan");
    if (shared) {
      const decoded = decodeShare(shared);
      if (decoded) {
        setInput(decoded);
        setAdjustedParticipants(decoded.expectedParticipants);
        setAdjustedVolunteers(decoded.availableVolunteers);
        setIsGenerated(true);
        setStep(2);
      }
    }
  }, []);

  useEffect(() => {
    setAdjustedParticipants(input.expectedParticipants);
  }, [input.expectedParticipants]);

  useEffect(() => {
    setAdjustedVolunteers(input.availableVolunteers);
  }, [input.availableVolunteers]);

  const plan = useMemo(() => calculatePlan(input, adjustedParticipants, adjustedVolunteers), [input, adjustedParticipants, adjustedVolunteers]);
  const config = TYPE_CONFIG[input.eventType];
  const shoppingList = useMemo(() => getShoppingList(input, adjustedParticipants), [input, adjustedParticipants]);
  const animationRows = useMemo(() => getAnimationRows(input, adjustedParticipants), [input, adjustedParticipants]);
  const alcoholSelected = hasAlcohol(input);

  useEffect(() => {
    setShareUrl(`${window.location.origin}${window.location.pathname}?plan=${encodeShare(input, adjustedParticipants, adjustedVolunteers)}`);
  }, [input, adjustedParticipants, adjustedVolunteers]);

  const chartData = [
    { name: "Budget", amount: input.startingBudget },
    { name: "Argent qui rentre", amount: plan.totalRevenue },
    { name: "Dépenses", amount: plan.totalCosts },
    { name: "Reste", amount: plan.net },
  ];

  const scenarios = [
    { label: "Si moins de monde vient", participants: Math.max(20, Math.round(adjustedParticipants * 0.75)) },
    { label: "Prévision actuelle", participants: adjustedParticipants },
    { label: "Si ça marche mieux", participants: Math.round(adjustedParticipants * 1.25) },
  ].map((scenario) => ({ ...scenario, net: calculatePlan(input, scenario.participants, adjustedVolunteers).net }));

  const priorities = [
    plan.net < 0 ? `Réduire les dépenses ou viser ${plan.minimumParticipants} participants minimum pour ne pas perdre d'argent.` : "Garder un petit coussin de sécurité dans le budget pour les imprévus.",
    plan.volunteerGap < 0 ? `Trouver ${Math.abs(plan.volunteerGap)} bénévole(s) de plus pour tenir les stands sereinement.` : "Confirmer les bénévoles disponibles et leur donner un rôle simple.",
    alcoholSelected ? "Demander l'autorisation de buvette temporaire si vous servez de l'alcool." : "Vérifier assurance, mairie et règles applicables au lieu de l'événement.",
  ];

  const retroplanning = [
    { date: "J-60", when: addDays(input.date, -60), task: "Valider format, budget cible et responsables", owner: "Organisateur" },
    { date: "J-45", when: addDays(input.date, -45), task: "Lancer démarches mairie, assurance et matériel", owner: "Admin" },
    { date: "J-30", when: addDays(input.date, -30), task: "Bloquer fournisseurs, achats longs et plan bénévoles", owner: "Logistique" },
    { date: "J-15", when: addDays(input.date, -15), task: "Confirmer stocks, stands, parcours visiteurs et caisse", owner: "Trésorier" },
    { date: "J-7", when: addDays(input.date, -7), task: "Brief bénévoles, météo, sécurité et plan B", owner: "Coordinateur" },
    { date: "Jour J", when: addDays(input.date, 0), task: "Installation, accueil, exploitation, rangement rapide", owner: "Tous" },
    { date: "J+1", when: addDays(input.date, 1), task: "Bilan financier, retours bénévoles et archivage", owner: "Bureau" },
  ];

  const messages = [
    {
      title: "Save the date",
      text: `Bonjour à toutes et tous,\n\nNous avons le plaisir de vous annoncer que notre événement "${input.eventName}" aura lieu le ${formatDate(input.date)}.\n\nRéservez la date, plus d'informations arrivent bientôt.\n\nL'équipe organisatrice`,
    },
    {
      title: "Appel à bénévoles",
      text: `Bonjour,\n\nPour organiser "${input.eventName}", nous recherchons des bénévoles pour aider à l'installation, l'accueil, l'animation et le rangement.\n\nMême une heure d'aide est précieuse. Si vous êtes disponible le ${formatDate(input.date)}, répondez à ce message avec vos créneaux.\n\nMerci beaucoup !`,
    },
    {
      title: "Rappel J-3",
      text: `Bonjour à toutes et tous,\n\nPetit rappel : "${input.eventName}" aura lieu dans quelques jours, le ${formatDate(input.date)}.\n\nNous avons hâte de vous y retrouver. N'hésitez pas à en parler autour de vous !\n\nL'équipe organisatrice`,
    },
  ];

  function updateInput<K extends keyof PlannerInput>(key: K, value: PlannerInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function changeEventType(eventType: EventType) {
    setInput((current) => ({
      ...current,
      eventType,
      selectedAnimations: TYPE_CONFIG[eventType].animations.slice(0, 3).map((animation) => animation.label),
    }));
  }

  function updateAnimations(values: string[]) {
    setInput((current) => ({ ...current, selectedAnimations: values }));
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function copyMessage(title: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedMessage(title);
    window.setTimeout(() => setCopiedMessage(null), 1600);
  }

  const steps = ["Événement", "Budget", "Plan généré"];

  return (
    <main className="min-h-screen bg-[color:var(--color-background)] px-4 py-8">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-sm">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[color:var(--color-primary-soft)]" aria-hidden />
          <div className="absolute right-4 top-4 hidden rounded-full bg-[color:var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white sm:block">
            MVP hackathon · démo 4 minutes
          </div>
          <div className="relative max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-primary-soft)] px-3 py-1 text-sm font-medium text-[color:var(--color-primary-dark)]">
              <PartyPopper className="h-4 w-4" /> One Day Event Planner
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[color:var(--color-accent)] sm:text-4xl">
              Organisez votre événement associatif, simplement et sans stress
            </h1>
            <p className="text-[color:var(--color-muted-foreground)]">
              Quelques informations suffisent pour obtenir un plan clair : budget facile à lire, bénévoles nécessaires, achats à prévoir, démarches à vérifier et prochaines priorités.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {steps.map((label, index) => {
            const active = step === index;
            const clickable = index < 2 || isGenerated;
            return (
              <button
                key={label}
                type="button"
                onClick={() => clickable ? setStep(index) : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white" : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted-foreground)] hover:bg-[color:var(--color-muted)]"}`}
              >
                {index + 1}. {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.section
              key="step-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              <div className="space-y-4 rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-[color:var(--color-accent)]">1. Décrivez l&apos;événement</h2>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Nom de l&apos;événement</span>
                  <input className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.eventName} onChange={(event) => updateInput("eventName", event.target.value)} />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Type</span>
                  <select className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.eventType} onChange={(event) => changeEventType(event.target.value as EventType)}>
                    {Object.keys(TYPE_CONFIG).map((type) => <option key={type}>{type}</option>)}
                  </select>
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Date exacte</span>
                  <input type="date" className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.date} onChange={(event) => updateInput("date", event.target.value)} />
                </label>
                <Button className="w-full" onClick={() => setStep(1)}>Continuer vers le budget</Button>
              </div>

              <div className="relative min-h-96 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                <div className={`${isGenerated ? "blur-none" : "blur-sm"} space-y-4 transition`}>
                  <div className="rounded-xl border border-[color:var(--color-primary-soft)] bg-[color:var(--color-primary-soft)] p-4">
                    <p className="text-sm font-medium text-[color:var(--color-primary-dark)]">Aperçu du plan</p>
                    <p className="mt-2 text-2xl font-semibold text-[color:var(--color-accent)]">Budget, achats, priorités et messages</p>
                  </div>
                  {["Participants minimum sans perte", "Liste de courses estimée", "Tips par type d'événement", "Messages prêts à copier"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                {!isGenerated && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40 p-6 text-center">
                    <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-md">
                      <p className="text-lg font-semibold text-[color:var(--color-accent)]">Votre plan est presque prêt</p>
                      <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">Complétez le wizard pour révéler le dashboard.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {step === 1 && (
            <motion.section
              key="step-1"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              <div className="space-y-4 rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                <h2 className="text-xl font-semibold text-[color:var(--color-accent)]">2. Budget et ressources</h2>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Budget de départ</span>
                  <div className="relative">
                    <input type="number" className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 pr-10 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.startingBudget} onChange={(event) => updateInput("startingBudget", Number(event.target.value))} />
                    <span className="absolute right-3 top-2.5 text-[color:var(--color-muted-foreground)]">€</span>
                  </div>
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Participants espérés</span>
                  <input type="number" className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.expectedParticipants} onChange={(event) => updateInput("expectedParticipants", Number(event.target.value))} />
                </label>
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                  <button type="button" onClick={() => updateInput("isFree", true)} className={`rounded-xl border p-3 text-left text-sm font-medium ${input.isFree ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary-dark)]" : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted-foreground)]"}`}>Entrée gratuite</button>
                  <button type="button" onClick={() => updateInput("isFree", false)} className={`rounded-xl border p-3 text-left text-sm font-medium ${!input.isFree ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary-dark)]" : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted-foreground)]"}`}>Entrée payante</button>
                </div>
                {!input.isFree && (
                  <label className="block space-y-2 text-sm font-medium">
                    <span>Prix d&apos;entrée moyen</span>
                    <div className="relative">
                      <input type="number" className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 pr-10 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.ticketPrice} onChange={(event) => updateInput("ticketPrice", Number(event.target.value))} />
                      <span className="absolute right-3 top-2.5 text-[color:var(--color-muted-foreground)]">€</span>
                    </div>
                  </label>
                )}
                <label className="block space-y-2 text-sm font-medium">
                  <span>Bénévoles disponibles</span>
                  <input type="number" className="w-full rounded-xl border border-[color:var(--color-border)] bg-white px-3 py-2 focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]" value={input.availableVolunteers} onChange={(event) => updateInput("availableVolunteers", Number(event.target.value))} />
                </label>
                <button type="button" onClick={() => updateInput("hasSponsors", !input.hasSponsors)} className={`w-full rounded-xl border px-3 py-2 text-sm font-medium ${input.hasSponsors ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary-dark)]" : "border-[color:var(--color-border)] bg-white text-[color:var(--color-muted-foreground)]"}`}>
                  Sponsors ou subvention prévue
                </button>

                <div className="space-y-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3">
                  <div className="flex items-center gap-2 font-semibold text-[color:var(--color-accent)]"><Sparkles className="h-4 w-4 text-[color:var(--color-primary)]" /> Animations prévues</div>
                  <p className="text-sm text-[color:var(--color-muted-foreground)]">Trois animations sont pré-sélectionnées. Désélectionnez ou ajoutez-en avec Cmd/Ctrl + clic.</p>
                  <select
                    multiple
                    className="h-40 w-full rounded-lg border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary-soft)]"
                    value={input.selectedAnimations}
                    onChange={(event) => updateAnimations(Array.from(event.target.selectedOptions).map((option) => option.value))}
                  >
                    {config.animations.map((animation) => <option key={animation.label} value={animation.label}>{animation.label}</option>)}
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(0)}>Retour</Button>
                  <Button className="flex-1" onClick={() => { setIsGenerated(true); setStep(2); }}>Générer mon plan</Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Euro className="h-5 w-5 text-[color:var(--color-primary)]" /> Estimation instantanée</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`rounded-xl border p-4 ${statusClasses(plan.budgetStatus)}`}>
                    <p className="text-sm font-medium">Argent restant estimé</p>
                    <p className="text-3xl font-bold">{formatEuro(plan.net)}</p>
                  </div>
                  <p className="text-sm text-[color:var(--color-muted-foreground)]">Il faut environ {plan.minimumParticipants} participants pour ne pas perdre d&apos;argent. Vous pourrez ajuster ce nombre après génération.</p>
                  <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3 text-sm">
                    <p className="font-semibold text-[color:var(--color-accent)]">Coût et revenu estimés par animation</p>
                    <div className="mt-2 space-y-2">
                      {animationRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-2 border-t border-[color:var(--color-border)] pt-2 first:border-t-0 first:pt-0">
                          <span>{row.label}</span>
                          <span className="text-right text-[color:var(--color-muted-foreground)]">{formatEuro(row.cost)} dép. | {formatEuro(row.revenue)} rec.</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${statusClasses(plan.globalStatus)}`}>{statusLabel(plan.globalStatus)}</div>
                    <h2 className="text-3xl font-bold text-[color:var(--color-accent)]">{input.eventName}</h2>
                    <div className="flex flex-wrap gap-3 text-sm text-[color:var(--color-muted-foreground)]">
                      <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {formatDate(input.date)}</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {plan.participants} participants</span>
                      <span className="flex items-center gap-1"><Sparkles className="h-4 w-4" /> {input.selectedAnimations.length} animations</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={copyShareLink} className="gap-2">
                    {copied ? <Clipboard className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    {copied ? "Lien copié" : "Copier le lien partageable"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
                <Card>
                  <CardHeader><CardTitle className="text-sm font-medium text-[color:var(--color-muted-foreground)]">Argent restant estimé</CardTitle></CardHeader>
                  <CardContent><p className={`text-4xl font-bold ${plan.net >= 0 ? "text-emerald-700" : "text-red-700"}`}>{formatEuro(plan.net)}</p><p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">Budget de départ inclus</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm font-medium text-[color:var(--color-muted-foreground)]">Participants minimum sans perte</CardTitle></CardHeader>
                  <CardContent><p className="text-4xl font-bold text-[color:var(--color-primary)]">{plan.minimumParticipants}</p><p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">objectif pour finir à 0 € ou plus</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm font-medium text-[color:var(--color-muted-foreground)]">Bénévoles</CardTitle></CardHeader>
                  <CardContent><p className={`text-4xl font-bold ${plan.volunteerStatus === "red" ? "text-red-700" : "text-emerald-700"}`}>{adjustedVolunteers}/{plan.recommendedVolunteers}</p><p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">disponibles vs recommandés</p></CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Lightbulb className="h-5 w-5 text-[color:var(--color-primary)]" /> Les 3 priorités de cette semaine</CardTitle></CardHeader>
                <CardContent className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {priorities.map((priority) => (
                    <div key={priority} className="rounded-xl border border-[color:var(--color-primary-soft)] bg-[color:var(--color-primary-soft)] p-3 text-sm font-medium text-[color:var(--color-primary-dark)]">{priority}</div>
                  ))}
                </CardContent>
              </Card>

              {alcoholSelected && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5" />
                    <div>
                      <p className="font-semibold">Autorisation buvette temporaire à vérifier</p>
                      <p className="mt-1 text-sm">Si vous servez de l&apos;alcool, pensez à demander l&apos;autorisation en mairie et à vérifier les règles applicables à votre événement.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[color:var(--color-accent)]"><SlidersHorizontal className="h-5 w-5 text-[color:var(--color-primary)]" /> Ajuster les participants</div>
                  <input type="range" min="20" max="600" step="5" value={adjustedParticipants} onChange={(event) => setAdjustedParticipants(Number(event.target.value))} className="w-full accent-[color:var(--color-primary)]" />
                  <div className="mt-2 flex justify-between text-sm text-[color:var(--color-muted-foreground)]"><span>20</span><span className="font-semibold text-[color:var(--color-primary-dark)]">{adjustedParticipants} participants</span><span>600</span></div>
                </div>
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[color:var(--color-accent)]"><Users className="h-5 w-5 text-[color:var(--color-primary)]" /> Ajuster les bénévoles</div>
                  <input type="range" min="1" max="80" step="1" value={adjustedVolunteers} onChange={(event) => setAdjustedVolunteers(Number(event.target.value))} className="w-full accent-[color:var(--color-primary)]" />
                  <div className="mt-2 flex justify-between text-sm text-[color:var(--color-muted-foreground)]"><span>1</span><span className="font-semibold text-[color:var(--color-primary-dark)]">{adjustedVolunteers} bénévoles</span><span>80</span></div>
                </div>
              </div>

              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Euro className="h-5 w-5 text-[color:var(--color-primary)]" /> Budget simplifié</CardTitle></CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-72 w-full">
                      <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9e3d8" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6f80" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b6f80" }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="amount" fill="var(--color-amount)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                    <div className="mt-3 grid gap-2 text-sm" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
                      <span>Entrées: {formatEuro(plan.ticketRevenue)}</span>
                      <span>Animations: {formatEuro(plan.animationRevenue)}</span>
                      <span>Sponsors: {formatEuro(plan.sponsorRevenue)}</span>
                      <span>Dépenses: {formatEuro(plan.totalCosts)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Users className="h-5 w-5 text-[color:var(--color-primary)]" /> Staffing recommandé</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {([
                      ["Coordination", 1],
                      ["Accueil et caisse", Math.max(1, Math.ceil(plan.recommendedVolunteers * 0.2))],
                      ["Buvette ou restauration", input.selectedAnimations.some((item) => item.includes("Buvette") || item === "Repas") ? Math.max(2, Math.ceil(plan.recommendedVolunteers * 0.3)) : 0],
                      ["Animations et stands", Math.max(1, Math.ceil(plan.recommendedVolunteers * 0.3))],
                      ["Installation et rangement", Math.max(2, Math.ceil(plan.recommendedVolunteers * 0.25))],
                    ] as const).filter((row) => row[1] > 0).map(([role, count]) => (
                      <div key={role} className="flex items-center justify-between rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3">
                        <span className="font-medium">{role}</span><span className="text-[color:var(--color-primary-dark)] font-semibold">{count} pers.</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)]" /> Liste de courses estimée</CardTitle></CardHeader>
                <CardContent className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                  {shoppingList.map((group) => (
                    <div key={group.category} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3">
                      <p className="font-semibold text-[color:var(--color-accent)]">{group.category}</p>
                      <div className="mt-2 space-y-2">
                        {group.items.map((item) => (
                          <div key={`${group.category}-${item.label}`} className="border-t border-[color:var(--color-border)] pt-2 text-sm first:border-t-0 first:pt-0">
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium">{item.label}</span>
                              <span className="text-[color:var(--color-primary-dark)] font-semibold">{formatEuro(item.budget)}</span>
                            </div>
                            <p className="text-[color:var(--color-muted-foreground)]">{item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><CalendarDays className="h-5 w-5 text-[color:var(--color-primary)]" /> Rétroplanning</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {retroplanning.map((item) => (
                      <div key={item.date} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-3">
                        <div className="flex items-center justify-between gap-3"><span className="font-semibold text-[color:var(--color-primary-dark)]">{item.date}</span><span className="text-sm text-[color:var(--color-muted-foreground)]">{item.when}</span></div>
                        <p className="mt-1 text-sm font-medium">{item.task}</p>
                        <p className="mt-1 text-xs text-[color:var(--color-muted-foreground)]">Responsable: {item.owner}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><CheckCircle2 className="h-5 w-5 text-[color:var(--color-primary)]" /> Checklist administrative</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {[...config.admin, ...(alcoholSelected ? ["Demander l'autorisation de buvette temporaire en mairie"] : [])].map((item) => <div key={item} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /><span>{item}</span></div>)}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Sparkles className="h-5 w-5 text-[color:var(--color-primary)]" /> Animations retenues</CardTitle></CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {input.selectedAnimations.map((item) => <span key={item} className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-3 py-1 text-sm">{item}</span>)}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card>
                <CardHeader><CardTitle className="text-[color:var(--color-accent)]">Scénarios financiers</CardTitle></CardHeader>
                <CardContent className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  {scenarios.map((scenario) => (
                    <div key={scenario.label} className={`rounded-xl border p-4 ${scenario.net >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                      <p className="font-semibold">{scenario.label}</p>
                      <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">{scenario.participants} participants</p>
                      <p className={`mt-2 text-2xl font-bold ${scenario.net >= 0 ? "text-emerald-700" : "text-red-700"}`}>{formatEuro(scenario.net)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-[color:var(--color-accent)]"><Users className="h-5 w-5 text-[color:var(--color-primary)]" /> Messages prêts à copier</CardTitle>
                    <span className="text-sm text-[color:var(--color-muted-foreground)]">Communication adhérents, bénévoles, participants</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                  {messages.map((message) => (
                    <div key={message.title} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-[color:var(--color-foreground)]">{message.title}</p>
                        <Button variant="outline" size="sm" onClick={() => copyMessage(message.title, message.text)} className="gap-2"><Clipboard className="h-4 w-4" /> {copiedMessage === message.title ? "Copié" : "Copier"}</Button>
                      </div>
                      <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[color:var(--color-muted-foreground)]">{message.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="rounded-2xl border border-[color:var(--color-primary-soft)] bg-[color:var(--color-primary-soft)] p-5">
                <div className="flex items-center gap-2 text-xl font-semibold text-[color:var(--color-primary-dark)]"><Lightbulb className="h-5 w-5" /> Tips à vérifier pour votre {input.eventType.toLowerCase()}</div>
                <p className="mt-2 text-sm text-[color:var(--color-primary-dark)]/80">Ces points dépendent du lieu, de la commune et du format exact de l&apos;événement. Ils sont là pour vous aider à poser les bonnes questions sans complexifier le MVP.</p>
                <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  {config.tips.map((tip) => <div key={tip} className="flex gap-2 rounded-xl bg-white p-3 text-sm font-medium text-[color:var(--color-muted-foreground)]"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /><span>{tip}</span></div>)}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
