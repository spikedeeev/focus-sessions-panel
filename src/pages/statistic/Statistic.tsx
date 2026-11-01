import { useEffect } from "react";
import { useNotification } from "@/app/context/notification/useContext";
import { useStats } from "@/app/context/stats/useContext";
import Notification from "@/shared/ui/notification/Notification";
import styles from "./style.module.scss";

function Statistic() {
  const { state } = useStats();
  const { dispatch } = useNotification();
  useEffect(() => {
    return () => dispatch({ type: "HIDE" });
  }, [dispatch]);
  const today = new Date().toISOString().split("T")[0];

  const sessionsToday = state.history.filter(
    (session) => session.type === "focus" && session.endedAt.startsWith(today),
  ).length;

  const cards = [
    { value: sessionsToday, title: "Today" },
    { value: state.totalSessions, title: "Total sessions" },
    { value: state.completedTasks, title: "Tasks completed" },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "focus":
        return "Focus";

      case "shortBreak":
        return "Short break";

      case "longBreak":
        return "Long break";

      default:
        return type;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Statistics</h2>

      <div className={styles.cards}>
        {cards.map((card) => (
          <div className={styles.card} key={card.title}>
            <h3>{card.value}</h3>
            <span>{card.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>History</h2>

        {state.history.length === 0 ? (
          <h3 className={styles.alert}>No completed sessions yet</h3>
        ) : (
          <div className={styles.history}>
            {state.history.map((session) => (
              <div className={styles.historyItem} key={session.id}>
                <div className={styles.left}>
                  <h3 className={styles.taskTitle}>{session.taskTitle}</h3>

                  <div className={styles.type}>
                    <span>Type:</span> {getTypeLabel(session.type)}
                  </div>
                </div>

                <div className={styles.right}>
                  <div className={styles.info}>
                    <span>Started:</span>{" "}
                    {new Date(session.startedAt).toLocaleString("ru-RU")}
                  </div>

                  <div className={styles.info}>
                    <span>Ended:</span>{" "}
                    {new Date(session.endedAt).toLocaleString("ru-RU")}
                  </div>

                  <div className={styles.info}>
                    <span>Duration:</span>{" "}
                    {Math.round(session.durationMs / 60000)} min
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Notification />
    </div>
  );
}

export default Statistic;
