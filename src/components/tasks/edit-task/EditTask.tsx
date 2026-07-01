import { useState, useEffect } from "react";
import { useTasks } from "@/app/context/tasks/useContext";
import { useNotification } from "@/app/context/notification/useContext";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { FiX } from "react-icons/fi";
import styles from "./style.module.scss";

function EditTask() {
  const { state, dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const { dispatch: notificationDispatch } = useNotification();
  const task = state.tasks.find((i) => i.id === state.editingTaskId);

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch({ type: "CLOSE_EDIT_TASK" });
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [title, description, task]);

  const handleSave = () => {
    dispatch({
      type: "SAVE_EDIT_TASK",
      payload: {
        id: task.id,
        data: {
          title,
          description,
        },
      },
    });

    notificationDispatch({ type: "SHOW", payload: "Задача обновлена!" });
  };

  if (!task) return null;

  return (
    <div
      className={styles.overlay}
      onClick={() => dispatch({ type: "CLOSE_EDIT_TASK" })}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Редактировать задачу</h2>
          <button onClick={() => dispatch({ type: "CLOSE_EDIT_TASK" })}>
            <FiX color="#0A0A0A" size={16} />
          </button>
        </div>
        <div className={styles.edit}>
          <label>
            Название
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Описание
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Добавить описание задачи..."
            />
          </label>
        </div>
        <div className={styles.actions}>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: "CLOSE_EDIT_TASK" })}
          >
            Отмена
          </Button>
          <Button variant="filled" onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
