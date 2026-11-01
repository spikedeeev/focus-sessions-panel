import { useTasks } from "@/app/context/tasks/useContext";
import { useTimer } from "@/app/context/timer/useContext";
import Timer from "@/components/timer/Timer";
import styles from "./style.module.scss";

function Session() {
  const { state: tasksState } = useTasks();
  const { state: timerState } = useTimer();
  const currentTask = tasksState.tasks.find(
    (i) => i.id === tasksState.currentTaskId,
  );
  const sessionMode =
    timerState.mode === "focus"
      ? "Focus session"
      : timerState.mode === "shortBreak"
        ? "Short break"
        : "Long break";
  return (
    <div className={styles.wrapper}>
      <div className={styles.sessionCard}>
        <div className={styles.eyebrow}>
          <span className={styles.statusDot} />
          TIME FOR YOURSELF
        </div>

        <div className={styles.title}>
          <h2>{sessionMode}</h2>
        </div>

        {!tasksState.currentTaskId ? (
          <span className={styles.subtitle}>Choose a task to get started</span>
        ) : (
          <div className={styles.task}>
            <span className={styles.taskTitle}>{currentTask?.title}</span>
            <span className={styles.taskDesc}>{currentTask?.description}</span>
          </div>
        )}

        <Timer />

        <div className={styles.info}>
          <span className={styles.sessionCount}>
            {timerState.completedSessions}
          </span>
          <span>sessions completed</span>
        </div>
      </div>
    </div>
  );
}

export default Session;
