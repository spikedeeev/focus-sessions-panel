import { useReducer, useEffect } from "react";
import { StatsContext } from "./StatsContext";
import { statsReducer } from "./stats.reducer";
import type { StatsState } from "./stats.type";

const initialState: StatsState = {
  totalSessions: 0,
  completedTasks: 0,
  history: [],
};

const getInitialState = (): StatsState => {
  try {
    const saved = localStorage.getItem("stats");

    if (!saved) return initialState;

    const parsed = JSON.parse(saved);

    if (!parsed?.history) return initialState;

    return parsed;
  } catch {
    localStorage.removeItem("stats");
    return initialState;
  }
};

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    statsReducer,
    initialState,
    getInitialState,
  );
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(state));
  }, [state]);
  return (
    <StatsContext.Provider value={{ state, dispatch }}>
      {children}
    </StatsContext.Provider>
  );
};
