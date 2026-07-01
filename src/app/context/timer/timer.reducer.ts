import type { TimerState, TimerActions } from "./timer.type";

export const timerReducer = (
  state: TimerState,
  action: TimerActions,
): TimerState => {
  switch (action.type) {
    case "START": {
      return {
        ...state,
        isRunning: true,
        endTime: action.payload.endTime,
        remainingMs: action.payload.durationMs,
      };
    }
    case "PAUSE": {
      return {
        ...state,
        isRunning: false,
        endTime: null,
        remainingMs: action.payload.remainingMs,
      };
    }

    case "RESET":
      return {
        ...state,
        isRunning: false,
        endTime: null,
        remainingMs: action.payload.durationMs,
      };
    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.payload.mode,
        isRunning: false,
        endTime: null,
        remainingMs: action.payload.durationMs,
      };
    case "COMPLETED_SESSION":
      return {
        ...state,
        completedSessions: state.completedSessions + 1,
      };
    case "SYNC_DURATION":
      return {
        ...state,
        remainingMs: action.payload.durationMs,
      };
  }
};
