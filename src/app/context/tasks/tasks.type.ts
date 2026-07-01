export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  sessionsCompleted: number;
}

export interface TasksContextType {
  tasks: Task[];
  currentTaskId: string | null;

  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;

  setCurrentTask: (id: string | null) => void;
}
export type TaskFilter = "all" | "active" | "completed";

export interface TasksState {
  tasks: Task[];
  currentTaskId: string | null;
  filter: TaskFilter;
  editingTaskId: string | null;
  search: string;
}

export type TaskActions =
  | { type: "ADD_TASK"; payload: { title: string } }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | { type: "TOGGLE_TASK"; payload: { id: string } }
  | {
      type: "SET_CURRENT_TASK";
      payload: {
        id: string | null;
      };
    }
  | {
      type: "SET_FILTER";
      payload: {
        filter: TaskFilter;
      };
    }
  | {
      type: "OPEN_EDIT_TASK";
      payload: { taskId: string };
    }
  | {
      type: "CLOSE_EDIT_TASK";
    }
  | {
      type: "SAVE_EDIT_TASK";
      payload: {
        id: string;
        data: {
          title: string;
          description: string;
        };
      };
    }
  | {
      type: "SEARCH_TASK";
      payload: {
        search: string;
      };
    }
  | { type: "INCREMENT_TASK_SESSION"; payload: string };
