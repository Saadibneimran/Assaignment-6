"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiPlus, FiBookmark } from "react-icons/fi";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";

export default function ExerciseDetails() {
  const { id } = useParams();
  const { addToPlan, addToSaved, isInPlan, isSaved, planFull } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkout(id);
        if (data && data.id) {
          setWorkout(data);
        }
      } catch (error) {
        setWorkout(null);
      }
      setLoading(false);
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!workout) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-display text-3xl uppercase">Workout not found</h2>
        <Link href="/" className="mt-4 inline-block text-accent underline">
          Back to library
        </Link>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  let planButtonText = "Add to today's plan";
  if (alreadyInPlan) {
    planButtonText = "In today's plan";
  } else if (planFull) {
    planButtonText = "Plan is full";
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-line">
        <img src={workout.image} alt={workout.name} className="h-full max-h-[600px] w-full object-cover" />
      </div>

      <div>
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{workout.name}</h1>
        <p className="mt-3 text-muted">{workout.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span key={muscle} className="rounded-full border border-accent px-3 py-1 text-sm text-accent">
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="mt-8 font-display text-xl uppercase">Key Specs</h3>
        <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-panel">
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Equipment</span>
            <span className="font-medium">{workout.equipment}</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Difficulty</span>
            <span className="font-medium">{workout.difficulty}</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Sets</span>
            <span className="font-medium">{workout.sets}</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Reps</span>
            <span className="font-medium">{workout.reps}</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Duration</span>
            <span className="font-medium">{workout.duration} min</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Calories</span>
            <span className="font-medium">{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="uppercase tracking-wide text-muted">Rating</span>
            <span className="font-medium">{workout.rating}</span>
          </div>
        </div>

        <h3 className="mt-8 font-display text-xl uppercase">Instructions</h3>
        <ol className="mt-3 space-y-3">
          {workout.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(workout)}
            disabled={alreadyInPlan || planFull}
            className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiPlus /> {planButtonText}
          </button>
          <button
            onClick={() => addToSaved(workout)}
            disabled={alreadySaved}
            className="flex items-center justify-center gap-2 rounded-full border border-accent px-6 py-3 font-semibold text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiBookmark /> {alreadySaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
