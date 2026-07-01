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
    { value: sessionsToday, title: "Сегодня" },
    { value: state.totalSessions, title: "Всего сессий" },
    { value: state.completedTasks, title: "Выполнено задач" },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "focus":
        return "Фокус";

      case "shortBreak":
        return "Короткий перерыв";

      case "longBreak":
        return "Длинный перерыв";

      default:
        return type;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Статистика</h2>

      <div className={styles.cards}>
        {cards.map((card) => (
          <div className={styles.card} key={card.title}>
            <h3>{card.value}</h3>
            <span>{card.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>История</h2>

        {state.history.length === 0 ? (
          <h3 className={styles.alert}>Нет завершённых сессий</h3>
        ) : (
          <div className={styles.history}>
            {state.history.map((session) => (
              <div className={styles.historyItem} key={session.id}>
                <div className={styles.left}>
                  <h3 className={styles.taskTitle}>{session.taskTitle}</h3>

                  <div className={styles.type}>
                    <span>Тип:</span> {getTypeLabel(session.type)}
                  </div>
                </div>

                <div className={styles.right}>
                  <div className={styles.info}>
                    <span>Начало:</span>{" "}
                    {new Date(session.startedAt).toLocaleString("ru-RU")}
                  </div>

                  <div className={styles.info}>
                    <span>Конец:</span>{" "}
                    {new Date(session.endedAt).toLocaleString("ru-RU")}
                  </div>

                  <div className={styles.info}>
                    <span>Длительность:</span>{" "}
                    {Math.round(session.durationMs / 60000)} мин
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
