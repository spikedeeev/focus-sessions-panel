import Button from "@/shared/ui/button/Button";
import { VscDebugStart, VscDebugRestart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { useTimer } from "@/app/context/timer/useContext";
import { useSettings } from "@/app/context/settings/useContext";
import styles from "./style.module.scss";

function TimerControls() {
  const { state, dispatch } = useTimer();
  const { settings } = useSettings();

  const getDuration = () => {
    switch (state.mode) {
      case "focus":
        return settings.focusDuration * 60_000;

      case "shortBreak":
        return settings.shortBreakDuration * 60_000;

      case "longBreak":
        return settings.longBreakDuration * 60_000;
    }
  };

  const start = () =>
    dispatch({
      type: "START",
      payload: {
        endTime: Date.now() + state.remainingMs,
        durationMs: state.remainingMs,
      },
    });

  const pause = () =>
    dispatch({
      type: "PAUSE",
      payload: {
        remainingMs: Math.max(0, state.endTime! - Date.now()),
      },
    });

  const reset = () =>
    dispatch({
      type: "RESET",
      payload: {
        durationMs: getDuration(),
      },
    });
  const skipPhase = () => {
    switch (state.mode) {
      case "focus":
        dispatch({
          type: "CHANGE_MODE",
          payload: {
            mode: "shortBreak",
            durationMs: settings.shortBreakDuration * 60_000,
          },
        });
        break;

      case "shortBreak":
      case "longBreak":
        dispatch({
          type: "CHANGE_MODE",
          payload: {
            mode: "focus",
            durationMs: settings.focusDuration * 60_000,
          },
        });
        break;
    }
  };
  return (
    <div className={styles.actions}>
      <Button
        onClick={() => (state.isRunning ? pause() : start())}
        variant="filled"
      >
        {state.isRunning ? (
          <>
            <IoIosPause />
            Пауза
          </>
        ) : (
          <>
            <VscDebugStart />
            Старт
          </>
        )}
      </Button>

      <Button onClick={reset} variant="outlined">
        <VscDebugRestart />
      </Button>
      <Button onClick={() => skipPhase()} variant="filled">
        Пропустить фазу
      </Button>
    </div>
  );
}

export default TimerControls;
