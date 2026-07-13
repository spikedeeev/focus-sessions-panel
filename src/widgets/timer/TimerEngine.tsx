import { useEffect, useMemo, useState } from "react";
import type { SessionMode } from "@/app/context/timer/timer.type";
import { useNotification } from "@/app/context/notification/useContext";
import { useStats } from "@/app/context/stats/useContext";
import { useTimer } from "@/app/context/timer/useContext";
import { useTasks } from "@/app/context/tasks/useContext";
import { useSettings } from "@/app/context/settings/useContext";
import { playEndSound, playStartSound } from "@/shared/lib/sound";

function TimerEngine() {
  const [now, setNow] = useState(Date.now());

  const { state: timerState, dispatch } = useTimer();
  const { state: tasksState, dispatch: tasksDispatch } = useTasks();
  const { settings } = useSettings();
  const { dispatch: notificationDispatch } = useNotification();
  const { dispatch: statsDispatch } = useStats();
  const currentTask = tasksState.tasks.find(
    (task) => task.id === tasksState.currentTaskId,
  );
  const startSoundEnabled = !settings.autoStartBreak && !settings.autoStartFocus;
  const timeLeft = useMemo(() => {
    if (!timerState.isRunning || !timerState.endTime) {
      return timerState.remainingMs;
    }

    return Math.max(0, timerState.endTime - now);
  }, [now, timerState]);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => clearInterval(id);
  }, []);

  const getDuration = (mode: SessionMode) => {
    switch (mode) {
      case "focus":
        return settings.focusDuration * 60_000;
      case "shortBreak":
        return settings.shortBreakDuration * 60_000;
      case "longBreak":
        return settings.longBreakDuration * 60_000;
    }
  };

  const start = (durationMs: number) => {
    dispatch({
      type: "START",
      payload: {
        durationMs,
        endTime: Date.now() + durationMs,
      },
    });
  };

  useEffect(() => {
    if (!timerState.isRunning) return;
    if (timeLeft > 0) return;

    playEndSound();
    const nowISO = new Date().toISOString();

    if (timerState.mode === "focus") {
      const durationMs = getDuration("focus");

      if (tasksState.currentTaskId) {
        tasksDispatch({
          type: "INCREMENT_TASK_SESSION",
          payload: tasksState.currentTaskId,
        });
      }

      statsDispatch({
        type: "ADD_SESSION",
        payload: {
          id: crypto.randomUUID(),
          taskId: tasksState.currentTaskId,
          taskTitle:
            tasksState.tasks.find((t) => t.id === tasksState.currentTaskId)
              ?.title ?? "Без задачи",
          startedAt: new Date(Date.now() - durationMs).toISOString(),
          endedAt: nowISO,
          durationMs,
          type: "focus",
        },
      });

      const nextCompleted = timerState.completedSessions + 1;

      dispatch({
        type: "COMPLETED_SESSION",
      });

      const nextMode: SessionMode =
        nextCompleted % settings.sessionsBeforeLongBreak === 0
          ? "longBreak"
          : "shortBreak";

      const nextDuration = getDuration(nextMode);

      dispatch({
        type: "CHANGE_MODE",
        payload: {
          mode: nextMode,
          durationMs: nextDuration,
        },
      });

      if (startSoundEnabled) {
        playStartSound();
      }

      notificationDispatch({
        type: "SHOW",
        payload:
          nextMode === "longBreak"
            ? "Фокус-сессия завершена. Начинается длинный перерыв."
            : "Фокус-сессия завершена. Начинается короткий перерыв.",
      });

      if (settings.autoStartBreak) {
        setTimeout(() => start(nextDuration), 0);
      }

      return;
    }

    const durationMs = getDuration("focus");

    statsDispatch({
      type: "ADD_SESSION",
      payload: {
        id: crypto.randomUUID(),
        taskId: null,
        taskTitle: currentTask!.title,
        startedAt: new Date(Date.now() - durationMs).toISOString(),
        endedAt: nowISO,
        durationMs,
        type: timerState.mode,
      },
    });

    dispatch({
      type: "CHANGE_MODE",
      payload: {
        mode: "focus",
        durationMs,
      },
    });

    if (startSoundEnabled) {
      playStartSound();
    }

    notificationDispatch({
      type: "SHOW",
      payload: "Перерыв завершён!",
    });

    if (settings.autoStartFocus) {
      setTimeout(() => start(durationMs), 0);
    }
  }, [timeLeft]);

  return null;
}

export default TimerEngine;
