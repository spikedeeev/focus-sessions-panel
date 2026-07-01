import { useTasks } from "@/app/context/tasks/useContext";
import Button from "@/shared/ui/button/Button";
import styles from "./style.module.scss";
import type { TaskFilter } from "@/app/context/tasks/tasks.type";

function TasksFilter() {
  const { state, dispatch } = useTasks();
  const filters: { value: TaskFilter; label: string }[] = [
    { value: "all", label: "Все" },
    { value: "active", label: "Активные" },
    { value: "completed", label: "Выполненные" },
  ];
  return (
    <div className={styles.content}>
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          variant={state.filter === value ? "filled" : "outlined"}
          onClick={() =>
            dispatch({
              type: "SET_FILTER",
              payload: { filter: value },
            })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default TasksFilter;
