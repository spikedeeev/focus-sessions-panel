import { useEffect, useMemo, useState } from "react";
import { useTimer } from "@/app/context/timer/useContext";
import { useSettings } from "@/app/context/settings/useContext";
import styles from "./style.module.scss";

const RADIUS = 96;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function TimerView() {
  const [now, setNow] = useState(Date.now());

  const { state } = useTimer();
  const { settings } = useSettings();

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

  const minutesByMode = {
    focus: settings.focusDuration,
    shortBreak: settings.shortBreakDuration,
    longBreak: settings.longBreakDuration,
  };
  const totalMs = minutesByMode[state.mode] * 60_000;
  const progress =
    totalMs > 0 ? Math.min(1, Math.max(0, 1 - timeLeft / totalMs)) : 0;

  return (
    <div
      className={`${styles.timerWrap} ${state.isRunning ? styles.running : ""}`}
    >
      <svg className={styles.ring} viewBox="0 0 216 216" aria-hidden="true">
        <circle className={styles.track} cx="108" cy="108" r={RADIUS} />
        <circle
          className={styles.progress}
          cx="108"
          cy="108"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <h2 className={styles.timer}>
        {minutes}:{String(seconds).padStart(2, "0")}
      </h2>
    </div>
  );
}

export default TimerView;
