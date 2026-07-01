import { useEffect } from "react";
import { useState } from "react";
import { useTasks } from "@/app/context/tasks/useContext";
import { useNotification } from "@/app/context/notification/useContext";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import styles from "./style.module.scss";

function AddTask() {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const { dispatch: notificationDispatch } = useNotification();
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        title: trimmedTitle,
      },
    });

    notificationDispatch({ type: "SHOW", payload: "Задача создана!" });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.content}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Добавить новую задачу..."
      />

      <Button variant="filled" type="submit">
        +
      </Button>
    </form>
  );
}

export default AddTask;
