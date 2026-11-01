import { useTasks } from "@/app/context/tasks/useContext";
import Input from "@/shared/ui/input/Input";
import styles from "./style.module.scss";

function SearchTask() {
  const { state, dispatch } = useTasks();

  return (
    <div className={styles.content}>
      <Input
        placeholder="Search tasks"
        value={state.search}
        onChange={(e) => {
          dispatch({
            type: "SEARCH_TASK",
            payload: {
              search: e.target.value,
            },
          });
        }}
      />
    </div>
  );
}

export default SearchTask;
