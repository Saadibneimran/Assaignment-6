export default function Spinner({ text = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-muted">{text}</p>
    </div>
  );
}
