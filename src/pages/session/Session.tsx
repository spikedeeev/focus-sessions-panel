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
      ? "Фокус-сессия"
      : timerState.mode === "shortBreak"
        ? "Короткий перерыв"
        : "Длинный перерыв";
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>{sessionMode}</h2>
      </div>

      {!tasksState.currentTaskId ? (
        <span className={styles.subtitle}>Выберите задачу</span>
      ) : (
        <div className={styles.task}>
          <span className={styles.taskTitle}>{currentTask?.title}</span>
          <span className={styles.taskDesc}>{currentTask?.description}</span>
        </div>
      )}

      <Timer />
      <div className={styles.info}>
        Сессий завершено: {timerState.completedSessions}
      </div>
    </div>
  );
}

export default Session;
