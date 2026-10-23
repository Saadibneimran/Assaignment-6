import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { FaFire, FaStar } from "react-icons/fa";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/exercise/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-accent"
    >
      <img src={workout.image} alt={workout.name} className="h-52 w-full object-cover" />

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span key={muscle} className="rounded-full border border-line px-2.5 py-0.5 text-xs uppercase text-muted">
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold uppercase">{workout.name}</h3>
        <p className="text-sm text-muted">{workout.equipment}</p>

        <div className="mt-3 flex items-center gap-4 text-sm">
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
    </Link>
  );
}
