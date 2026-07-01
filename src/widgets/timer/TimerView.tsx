import { useEffect, useMemo, useState } from "react";
import { useTimer } from "@/app/context/timer/useContext";
import styles from "./style.module.scss";

function TimerView() {
  const [now, setNow] = useState(Date.now());

  const { state } = useTimer();

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => clearInterval(id);
  }, []);

  const timeLeft = useMemo(() => {
    if (!state.isRunning || !state.endTime) {
      return state.remainingMs;
    }

    return Math.max(0, state.endTime - now);
  }, [state, now]);

  const totalSeconds = Math.floor(timeLeft / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <h2 className={styles.timer}>
      {minutes}:{String(seconds).padStart(2, "0")}
    </h2>
  );
}

export default TimerView;
