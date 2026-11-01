import { useEffect } from "react";
import { useNotification } from "@/app/context/notification/useContext";
import { useTasks } from "@/app/context/tasks/useContext";
import AddTask from "@/components/tasks/add-task/AddTask";
import TasksList from "@/components/tasks/tasks-list/TasksList";
import TasksFilter from "@/components/tasks/tasks-filter/TaskFilter";
import EditTask from "@/components/tasks/edit-task/EditTask";
import SearchTask from "@/components/tasks/search-task/SearchTask";
import Notification from "@/shared/ui/notification/Notification";
import styles from "./style.module.scss";

function Home() {
  const { dispatch } = useNotification();
  const { state } = useTasks();
  const activeTasks = state.tasks.filter((task) => !task.completed).length;
  const completedTasks = state.tasks.length - activeTasks;

  useEffect(() => {
    return () => dispatch({ type: "HIDE" });
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} />
            YOUR SPACE TO FOCUS
          </div>
          <h2>
            Focus on
            <br />
            <span>what matters.</span>
          </h2>
          <p>One clear step at a time turns big plans into reality.</p>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{activeTasks}</span>
              <span>in progress</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryItem}>
              <span className={styles.summaryValue}>{completedTasks}</span>
              <span>completed</span>
            </div>
          </div>
          <div className={styles.heroDecoration} aria-hidden="true">
            <span className={styles.decorationRing} />
            <span className={styles.decorationLeaf}>✳</span>
          </div>
        </section>

        <section className={styles.taskPanel} aria-labelledby="tasks-heading">
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.panelEyebrow}>YOUR LIST</span>
              <h3 id="tasks-heading">My tasks</h3>
            </div>
            <span className={styles.taskCount}>
              {activeTasks} IN PROGRESS
            </span>
          </div>

          <AddTask />

          <div className={styles.taskTools}>
            <SearchTask />
            <TasksFilter />
          </div>

          <TasksList />
        </section>

        <div className={styles.hiddenContent}>
          <EditTask />
          <Notification />
        </div>
      </div>
    </div>
  );
}

export default Home;
