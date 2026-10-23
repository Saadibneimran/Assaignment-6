"use client";
import { useState } from "react";
import Link from "next/link";
import { usePlan, MAX_PLAN } from "@/context/PlanContext";
import PlanItem from "@/components/PlanItem";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState("plan");

  let totalMinutes = 0;
  let totalCalories = 0;
  for (const workout of plan) {
    totalMinutes = totalMinutes + workout.duration;
    totalCalories = totalCalories + workout.caloriesBurned;
  }

  const currentList = tab === "plan" ? plan : saved;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-line bg-panel p-4 text-center">
          <p className="font-display text-4xl font-bold text-accent">{plan.length}</p>
          <p className="text-sm uppercase text-muted">Exercises</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-4 text-center">
          <p className="font-display text-4xl font-bold text-accent">{totalMinutes}</p>
          <p className="text-sm uppercase text-muted">Minutes</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-4 text-center">
          <p className="font-display text-4xl font-bold text-accent">{totalCalories}</p>
          <p className="text-sm uppercase text-muted">Calories</p>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <button
          onClick={() => setTab("plan")}
          className={`rounded-full px-5 py-2 text-sm font-medium ${
            tab === "plan" ? "bg-accent text-white" : "border border-line text-muted hover:text-white"
          }`}
        >
          Today's Plan ({plan.length}/{MAX_PLAN})
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`rounded-full px-5 py-2 text-sm font-medium ${
            tab === "saved" ? "bg-accent text-white" : "border border-line text-muted hover:text-white"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {currentList.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center">
            <h3 className="font-display text-3xl uppercase">Nothing here yet</h3>
            <p className="mt-2 text-muted">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold">
              Go to workouts
            </Link>
          </div>
        )}

        {tab === "plan" &&
          plan.map((workout) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              done={workout.done}
              showDone={true}
              onDone={() => markDone(workout)}
              onRemove={() => removeFromPlan(workout)}
            />
          ))}

        {tab === "saved" &&
          saved.map((workout) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              onRemove={() => removeFromSaved(workout)}
            />
          ))}
      </div>
    </div>
  );
}
