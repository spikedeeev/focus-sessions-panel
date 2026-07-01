import { useEffect } from "react";
import Settings from "@/components/settings/Settings";
import Notification from "@/shared/ui/notification/Notification";
import { useNotification } from "@/app/context/notification/useContext";
import styles from "./style.module.scss";

function Options() {
  const { dispatch } = useNotification();
  useEffect(() => {
    return () => dispatch({ type: "HIDE" });
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>Настройки</h2>
      </div>
      <Settings />
      <Notification />
    </div>
  );
}

export default Options;
