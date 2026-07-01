import { createContext } from "react";
import type { TasksState, TaskActions } from "./tasks.type";

export interface TasksContextType {
  state: TasksState;
  dispatch: React.Dispatch<TaskActions>;
}

export const TasksContext = createContext<TasksContextType | null>(null);
