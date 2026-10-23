import Link from "next/link";
import { FiClock, FiCheck, FiX } from "react-icons/fi";
import { FaFire, FaStar } from "react-icons/fa";

export default function PlanItem({ workout, done, onDone, onRemove, showDone }) {
  const fadeClass = done ? "opacity-60" : "";
  const titleClass = done ? "line-through" : "";

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border border-line bg-panel p-3 sm:flex-row sm:items-center ${fadeClass}`}>
      <img src={workout.image} alt={workout.name} className="h-40 w-full rounded-xl object-cover sm:h-24 sm:w-24" />

      <div className="flex-1">
        <h3 className={`font-display text-xl uppercase ${titleClass}`}>{workout.name}</h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-2 flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <FiClock className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FaFire className="text-accent" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/exercise/${workout.id}`} className="rounded-full border border-line px-4 py-2 text-sm hover:border-accent">
          View Details
        </Link>

        {showDone && (
          <button
            onClick={onDone}
            disabled={done}
            className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            <FiCheck /> {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button onClick={onRemove} aria-label="Remove" className="rounded-full border border-line p-2 hover:border-red-400 hover:text-red-400">
          <FiX />
        </button>
      </div>
    </div>
  );
}
