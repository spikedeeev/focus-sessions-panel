import { createContext } from "react";
import type { StatsState, StatsActions } from "./stats.type";

export interface StatsContextType {
  state: StatsState;
  dispatch: React.Dispatch<StatsActions>;
}

export const StatsContext = createContext<StatsContextType | null>(null);
