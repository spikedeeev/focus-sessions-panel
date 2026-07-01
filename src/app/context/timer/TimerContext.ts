import { createContext } from "react";
import type { TimerState, TimerActions } from "./timer.type";

export interface TimerContextType {
  state: TimerState;
  dispatch: React.Dispatch<TimerActions>;
}

export const TimerContext = createContext<TimerContextType | null>(null);
