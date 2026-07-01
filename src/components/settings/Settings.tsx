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
      <h3 className={styles.title}>Длительность (секунды)</h3>

      <div className={styles.inputs}>
        <div className={styles.field}>
          <label>Фокус</label>

          <Input
            value={settings.focusDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("focusDuration", value);
              syncTimerIfNeeded("focus", value);

              notify("Время фокус-сессии обновлено");
            }}
          />
        </div>

        <div className={styles.field}>
          <label>Перерыв</label>

          <Input
            value={settings.shortBreakDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("shortBreakDuration", value);
              syncTimerIfNeeded("shortBreak", value);

              notify("Время короткого перерыва обновлено");
            }}
          />
        </div>

        <div className={styles.field}>
          <label>Длинный</label>

          <Input
            value={settings.longBreakDuration}
            onChange={(e) => {
              const value = +e.target.value;

              updateSettings("longBreakDuration", value);
              syncTimerIfNeeded("longBreak", value);

              notify("Время длинного перерыва обновлено");
            }}
          />
        </div>
      </div>

      <div className={styles.card}>
        <span>Сессий до длинного перерыва</span>

        <Input
          value={settings.sessionsBeforeLongBreak}
          onChange={(e) => {
            const value = +e.target.value;

            updateSettings("sessionsBeforeLongBreak", value);
            notify("Количество сессий до длинного перерыва изменено");
          }}
        />
      </div>

      <h3 className={styles.title}>Автоматизация</h3>

      <div className={styles.card}>
        <span>Автостарт перерыва</span>

        <Switch
          checked={settings.autoStartBreak}
          onChange={(e) => {
            updateSettings("autoStartBreak", e.target.checked);

            notify(
              e.target.checked
                ? "Автостарт перерывов включён"
                : "Автостарт перерывов выключен",
            );
          }}
        />
      </div>

      <div className={styles.card}>
        <span>Автостарт фокус-сессии</span>

        <Switch
          checked={settings.autoStartFocus}
          onChange={(e) => {
            updateSettings("autoStartFocus", e.target.checked);

            notify(
              e.target.checked
                ? "Автостарт фокуса включён"
                : "Автостарт фокуса выключен",
            );
          }}
        />
      </div>
    </div>
  );
}

export default Settings;
