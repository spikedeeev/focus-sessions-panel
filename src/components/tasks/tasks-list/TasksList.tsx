import { useMemo } from "react";
import { useTasks } from "@/app/context/tasks/useContext";
import Task from "../task/Task";
import styles from "./style.module.scss";

function TasksList() {
  const { state } = useTasks();

  const filteredTasks = useMemo(() => {
    let tasks = state.tasks;

    if (state.filter === "active") {
      tasks = tasks.filter((task) => !task.completed);
    }

    if (state.filter === "completed") {
      tasks = tasks.filter((task) => task.completed);
    }

    if (state.search.trim()) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase()),
      );
    }

    return tasks;
  }, [state.tasks, state.filter, state.search]);
  return (
    <div>
      {filteredTasks.length !== 0 ? (
        <div className={styles.content}>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <h2 className={styles.title}>No tasks yet</h2>
      )}
    </div>
  );
}

export default TasksList;
