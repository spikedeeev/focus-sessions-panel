export interface SessionHistoryItem {
  id: string;
  taskId: string | null;
  taskTitle: string;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  type: "focus" | "shortBreak" | "longBreak";
}

export interface StatsState {
  totalSessions: number;
  completedTasks: number;
  history: SessionHistoryItem[];
}

export type StatsActions =
  | {
      type: "ADD_SESSION";
      payload: SessionHistoryItem;
    }
  | {
      type: "TASK_COMPLETED";
    };
