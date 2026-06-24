"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 h-20 w-full transition-all ${
        scrolled
          ? "border-b border-[color:var(--color-border)] bg-white/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-[6%]">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold text-[color:var(--color-text-title)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-white">
            <PartyPopper className="h-5 w-5" />
          </span>
          One Day Event Planner
        </Link>
        <div className="flex items-center gap-3">
          <Link href="#fonctionnalites" className="hidden text-sm font-medium text-[color:var(--color-text-subtitle)] hover:text-[color:var(--color-primary)] md:inline">
            Fonctionnalités
          </Link>
          <Link href="#types" className="hidden text-sm font-medium text-[color:var(--color-text-subtitle)] hover:text-[color:var(--color-primary)] md:inline">
            Événements
          </Link>
          <Link href="#faq" className="hidden text-sm font-medium text-[color:var(--color-text-subtitle)] hover:text-[color:var(--color-primary)] md:inline">
            FAQ
          </Link>
          <Link href="/planner">
            <Button size="sm">Commencer</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
