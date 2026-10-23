"use client";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const MAX_PLAN = 5;

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const planFull = plan.length >= MAX_PLAN;

  function isInPlan(id) {
    return plan.some((item) => item.id === id);
  }

  function isSaved(id) {
    return saved.some((item) => item.id === id);
  }

  function addToPlan(workout) {
    if (isInPlan(workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (planFull) {
      toast.error("Plan is full (5 lifts max)");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success(workout.name + " added to today's plan");
  }

  function addToSaved(workout) {
    if (isSaved(workout.id)) {
      toast.error("Already saved");
      return;
    }
    setSaved([...saved, workout]);
    toast.success(workout.name + " saved for later");
  }

  function removeFromPlan(workout) {
    setPlan(plan.filter((item) => item.id !== workout.id));
    toast.success(workout.name + " removed from plan");
  }

  function removeFromSaved(workout) {
    setSaved(saved.filter((item) => item.id !== workout.id));
    toast.success(workout.name + " removed from saved");
  }

  function markDone(workout) {
    const newPlan = plan.map((item) => {
      if (item.id === workout.id) {
        return { ...item, done: true };
      }
      return item;
    });
    setPlan(newPlan);
    toast.success(workout.name + " marked as done");
  }

  const value = {
    plan,
    saved,
    planFull,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  return useContext(PlanContext);
}
