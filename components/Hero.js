import { FiArrowDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-sm tracking-widest text-accent">WORKOUT LIBRARY</p>
        <h1 className="font-display text-5xl font-bold uppercase leading-tight sm:text-6xl lg:text-7xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-lg text-muted">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
          week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Browse workouts <FiArrowDown />
        </a>
      </div>

      <div className="flex justify-center rounded-3xl border border-line bg-panel p-6">
        <img src="/banner.png" alt="Gym illustration" className="h-72 w-auto object-contain sm:h-96" />
      </div>
    </section>
  );
}
