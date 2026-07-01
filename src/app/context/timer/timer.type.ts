export type SessionMode = "focus" | "shortBreak" | "longBreak";

export interface TimerState {
  mode: SessionMode;
  isRunning: boolean;
  remainingMs: number;
  endTime: number | null;
  completedSessions: number;
}

export type TimerActions =
  | {
      type: "START";
      payload: {
        endTime: number;
        durationMs: number;
      };
    }
  | {
      type: "PAUSE";
      payload: {
        remainingMs: number;
      };
    }
  | {
      type: "RESET";
      payload: {
        durationMs: number;
      };
    }
  | {
      type: "CHANGE_MODE";
      payload: {
        mode: SessionMode;
        durationMs: number;
      };
    }
  | {
      type: "COMPLETED_SESSION";
    }
  | {
      type: "SYNC_DURATION";
      payload: {
        durationMs: number;
      };
    };
