import type { TasksState, TaskActions, Task } from "./tasks.type";

export const tasksReducer = (
  state: TasksState,
  action: TaskActions,
): TasksState => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: "",
        completed: false,
        sessionsCompleted: 0,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((i) => i.id !== action.payload.id),
        currentTaskId:
          state.currentTaskId === action.payload.id
            ? null
            : state.currentTaskId,
      };
    }
    case "TOGGLE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((i) =>
          i.id === action.payload.id ? { ...i, completed: !i.completed } : i,
        ),
      };
    }

    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTaskId:
          state.currentTaskId === action.payload.id ? null : action.payload.id,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload.filter,
      };
    case "OPEN_EDIT_TASK":
      return {
        ...state,
        editingTaskId: action.payload.taskId,
      };

    case "CLOSE_EDIT_TASK":
      return {
        ...state,
        editingTaskId: null,
      };

    case "SAVE_EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.data.title,
                description: action.payload.data.description,
              }
            : task,
        ),
        editingTaskId: null,
      };
    case "SEARCH_TASK":
      return {
        ...state,
        search: action.payload.search,
      };
    case "INCREMENT_TASK_SESSION":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                sessionsCompleted: task.sessionsCompleted + 1,
              }
            : task,
        ),
      };
    default:
      return state;
  }
};
