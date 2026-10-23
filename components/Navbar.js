"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutLinkClass =
    pathname === "/" ? "bg-white text-ink" : "text-muted hover:text-white";
  const planLinkClass =
    pathname === "/my-plan" ? "bg-white text-ink" : "text-muted hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-wide">
          <img src="/logo.png" alt="FitLog logo" className="h-7 w-7" />
          FITLOG
        </Link>

        <ul className="order-3 flex w-full justify-center gap-2 sm:order-2 sm:w-auto">
          <li>
            <Link
              href="/"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${workoutLinkClass}`}
            >
              Workout
            </Link>
          </li>
          <li>
            <Link
              href="/my-plan"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${planLinkClass}`}
            >
              My Plan
            </Link>
          </li>
        </ul>

        <div className="order-2 flex gap-2 sm:order-3">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white">
            Plan <span className="ml-1">{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="rounded-full border border-accent px-3 py-1 text-sm font-semibold text-accent">
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
