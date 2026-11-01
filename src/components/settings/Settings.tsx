import { useSettings } from "@/app/context/settings/useContext";
import { useTimer } from "@/app/context/timer/useContext";
import { useNotification } from "@/app/context/notification/useContext";
import Input from "@/shared/ui/input/Input";
import Switch from "@/shared/ui/switch/Switch";

import type { SessionMode } from "@/app/context/timer/timer.type";

import styles from "./style.module.scss";

function Settings() {
  const { settings, updateSettings } = useSettings();
  const { state: timerState, dispatch: timerDispatch } = useTimer();
  const { dispatch: notificationDispatch } = useNotification();

  const notify = (message: string) => {
    notificationDispatch({
      type: "SHOW",
      payload: message,
    });
  };

  const syncTimerIfNeeded = (mode: SessionMode, durationSeconds: number) => {
    if (timerState.mode !== mode || timerState.isRunning) return;

    timerDispatch({
      type: "SYNC_DURATION",
      payload: {
        durationMs: durationSeconds * 60_000,
      },
    });
  };

  return (
    <div className={styles.settings}>
      <h3 className={styles.title}>Session durations (minutes)</h3>

      <div className={styles.inputs}>
        <div className={styles.field}>
          <label>Focus</label>

          <Input
            value={settings.focusDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("focusDuration", value);
              syncTimerIfNeeded("focus", value);

              notify("Focus session duration updated");
            }}
          />
        </div>

        <div className={styles.field}>
          <label>Short break</label>

          <Input
            value={settings.shortBreakDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("shortBreakDuration", value);
              syncTimerIfNeeded("shortBreak", value);

              notify("Short break duration updated");
            }}
          />
        </div>

        <div className={styles.field}>
          <label>Long break</label>

          <Input
            value={settings.longBreakDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("longBreakDuration", value);
              syncTimerIfNeeded("longBreak", value);

              notify("Long break duration updated");
            }}
          />
        </div>
      </div>

      <div className={styles.card}>
        <span>Sessions before a long break</span>

        <Input
          value={settings.sessionsBeforeLongBreak}
          onChange={(e) => {
            const value = +e.target.value;

            updateSettings("sessionsBeforeLongBreak", value);
            notify("Sessions before a long break updated");
          }}
        />
      </div>

      <h3 className={styles.title}>Automation</h3>

      <div className={styles.card}>
        <span>Auto-start breaks</span>

        <Switch
          checked={settings.autoStartBreak}
          onChange={(e) => {
            updateSettings("autoStartBreak", e.target.checked);

            notify(
              e.target.checked
                ? "Break auto-start enabled"
                : "Break auto-start disabled",
            );
          }}
        />
      </div>

      <div className={styles.card}>
        <span>Auto-start focus sessions</span>

        <Switch
          checked={settings.autoStartFocus}
          onChange={(e) => {
            updateSettings("autoStartFocus", e.target.checked);

            notify(
              e.target.checked
                ? "Focus auto-start enabled"
                : "Focus auto-start disabled",
            );
          }}
        />
      </div>
    </div>
  );
}

export default Settings;
