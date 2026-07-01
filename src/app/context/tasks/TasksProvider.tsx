import { useReducer, useEffect } from "react";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./tasks.reducer";
import type { TasksState } from "./tasks.type";
const initialState: TasksState = {
  tasks: [],
  currentTaskId: null,
  filter: "all",
  editingTaskId: null,
  search: "",
};
const getInitialState = (): TasksState => {
  const saved = localStorage.getItem("tasks");

  if (!saved || saved === "undefined") {
    return initialState;
  }

  try {
    return JSON.parse(saved) as TasksState;
  } catch (error) {
    console.error("Ошибка чтения tasks из localStorage:", error);

    localStorage.removeItem("tasks");

    return initialState;
  }
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    tasksReducer,
    undefined,
    getInitialState,
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);
  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
