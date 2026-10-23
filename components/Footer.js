export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <img src="/logo.png" alt="FitLog logo" className="h-7 w-7" />
          FITLOG
        </div>
        <p className="text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
