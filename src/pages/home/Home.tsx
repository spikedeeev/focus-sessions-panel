import { useEffect } from "react";
import { useNotification } from "@/app/context/notification/useContext";
import AddTask from "@/components/tasks/add-task/AddTask";
import TasksList from "@/components/tasks/tasks-list/TasksList";
import TasksFilter from "@/components/tasks/tasks-filter/TaskFilter";
import EditTask from "@/components/tasks/edit-task/EditTask";
import SearchTask from "@/components/tasks/search-task/SearchTask";
import Notification from "@/shared/ui/notification/Notification";
import styles from "./style.module.scss";

function Home() {
  const { dispatch } = useNotification();
  useEffect(() => {
    return () => dispatch({ type: "HIDE" });
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Задачи</h2>
        </div>
        <AddTask />
        <SearchTask />
        <TasksFilter />
        <TasksList />
        <EditTask />
        <Notification />
      </div>
    </div>
  );
}

export default Home;
