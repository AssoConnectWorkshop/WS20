import Link from "next/link";
import { PartyPopper } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-white py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-[6%] md:flex-row">
        <Link href="/" className="flex items-center gap-2 font-heading text-base font-semibold text-[color:var(--color-text-title)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-white">
            <PartyPopper className="h-4 w-4" />
          </span>
          One Day Event Planner
        </Link>
        <p className="text-sm text-[color:var(--color-text-muted)]">
          MVP hackathon · construit avec ❤️ sur la stack AssoConnect
        </p>
      </div>
    </footer>
  );
}
