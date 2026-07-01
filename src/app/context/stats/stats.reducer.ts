import type { StatsActions, StatsState } from "./stats.type";

export const statsReducer = (
  state: StatsState,
  action: StatsActions,
): StatsState => {
  switch (action.type) {
    case "ADD_SESSION":
      return {
        ...state,

        totalSessions:
          action.payload.type === "focus"
            ? state.totalSessions + 1
            : state.totalSessions,

        history: [action.payload, ...state.history].slice(0, 50),
      };

    case "TASK_COMPLETED":
      return {
        ...state,
        completedTasks: state.completedTasks + 1,
      };

    default:
      return state;
  }
};
