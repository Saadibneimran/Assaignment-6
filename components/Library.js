"use client";
import { useEffect, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("duration");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    }
    loadWorkouts();
  }, []);

  const searchText = search.toLowerCase();

  const filteredWorkouts = workouts.filter((workout) => {
    const nameMatches = workout.name.toLowerCase().includes(searchText);
    const muscleMatches = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(searchText)
    );
    return nameMatches || muscleMatches;
  });

  const sortedWorkouts = filteredWorkouts.sort((a, b) => {
    if (sortBy === "duration") {
      return b.duration - a.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    return b.rating - a.rating;
  });

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
          <p className="text-muted">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or tag"
              className="w-full rounded-full border border-line bg-panel py-2 pl-9 pr-4 text-sm outline-none focus:border-accent sm:w-56"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
              className="w-full appearance-none rounded-full border border-line bg-panel py-2 pl-4 pr-10 text-sm outline-none focus:border-accent"
            >
              <option value="duration">Sort By: Duration</option>
              <option value="calories">Sort By: Calories</option>
              <option value="rating">Sort By: Rating</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {loading && <Spinner />}

      {error && (
        <p className="py-20 text-center text-red-400">Could not load workouts. Please try again.</p>
      )}

      {!loading && !error && sortedWorkouts.length === 0 && (
        <p className="py-20 text-center text-muted">No workouts found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
