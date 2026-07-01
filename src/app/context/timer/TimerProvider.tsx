import { useEffect, useReducer } from "react";
import { TimerContext } from "./TimerContext";
import { timerReducer } from "./timer.reducer";
import { useSettings } from "../settings/useContext";
import type { TimerState } from "./timer.type";

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSettings();

  const getInitialState = (): TimerState => {
    const saved = localStorage.getItem("timer");

    const defaultState: TimerState = {
      mode: "focus",
      isRunning: false,
      endTime: null,
      remainingMs: settings.focusDuration * 60_000,
      completedSessions: 0,
    };

    if (!saved || saved === "undefined") {
      return defaultState;
    }

    try {
      const parsed = JSON.parse(saved) as TimerState;

      return {
        ...parsed,

        isRunning: false,
        endTime: null,
      };
    } catch (error) {
      console.error("Ошибка чтения timer из localStorage:", error);

      localStorage.removeItem("timer");

      return defaultState;
    }
  };

  const [state, dispatch] = useReducer(
    timerReducer,
    undefined,
    getInitialState,
  );

  useEffect(() => {
    localStorage.setItem(
      "timer",
      JSON.stringify({
        mode: state.mode,
        remainingMs: state.remainingMs,
        completedSessions: state.completedSessions,
      }),
    );
  }, [state]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
