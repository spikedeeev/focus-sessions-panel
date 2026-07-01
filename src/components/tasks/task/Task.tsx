import { useTasks } from "@/app/context/tasks/useContext";
import { useTimer } from "@/app/context/timer/useContext";
import { useSettings } from "@/app/context/settings/useContext";
import { useStats } from "@/app/context/stats/useContext";
import { useNotification } from "@/app/context/notification/useContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { FiX, FiTarget } from "react-icons/fi";
import { RiFileEditLine } from "react-icons/ri";

import styles from "./style.module.scss";

function Task({ task }) {
  const { state, dispatch } = useTasks();
  const { state: timerState, dispatch: timerDispatch } = useTimer();
  const { settings } = useSettings();
  const { dispatch: statsDispatch } = useStats();
  const { dispatch: notificationDispatch } = useNotification();
  const getDuration = () => {
    switch (timerState.mode) {
      case "focus":
        return settings.focusDuration * 60_000;
      case "shortBreak":
        return settings.shortBreakDuration * 60_000;
      case "longBreak":
        return settings.longBreakDuration * 60_000;
    }
  };

  const handleSetCurrentTask = () => {
    const isUnfocus = state.currentTaskId === task.id;

    dispatch({
      type: "SET_CURRENT_TASK",
      payload: { id: task.id },
    });

    if (isUnfocus) {
      timerDispatch({
        type: "RESET",
        payload: {
          durationMs: getDuration(),
        },
      });
    }
  };

  const handleDelete = () => {
    const isCurrent = state.currentTaskId === task.id;

    dispatch({
      type: "DELETE_TASK",
      payload: { id: task.id },
    });

    notificationDispatch({ type: "SHOW", payload: "Задача удалена!" });
    if (isCurrent) {
      timerDispatch({
        type: "RESET",
        payload: {
          durationMs: getDuration(),
        },
      });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.actions}>
        <button
          onClick={() => {
            dispatch({
              type: "TOGGLE_TASK",
              payload: { id: task.id },
            });
            !task.completed && statsDispatch({ type: "TASK_COMPLETED" });
          }}
        >
          {task.completed ? (
            <IoMdCheckmarkCircleOutline size={16} color="#00A63E" />
          ) : (
            <FaRegCircle color="#99A1AF" size={16} />
          )}
        </button>

        <button onClick={handleSetCurrentTask}>
          <FiTarget
            color={task.id === state.currentTaskId ? "#00A63E" : "#99A1AF"}
            size={16}
          />
        </button>

        <div className={styles.info}>
          <h3>{task.title}</h3>

          {task.description && (
            <div className={styles.description}>{task.description}</div>
          )}

          <div className={styles.completed}>
            {task.sessionsCompleted} сессий
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() =>
            dispatch({
              type: "OPEN_EDIT_TASK",
              payload: { taskId: task.id },
            })
          }
        >
          <RiFileEditLine color="#99A1AF" size={16} />
        </button>

        <button onClick={handleDelete}>
          <FiX color="#99A1AF" size={16} />
        </button>
      </div>
    </div>
  );
}

export default Task;
