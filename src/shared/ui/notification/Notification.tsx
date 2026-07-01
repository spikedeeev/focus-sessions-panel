import { useEffect } from "react";
import { useNotification } from "@/app/context/notification/useContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import styles from "./style.module.scss";

function Notification() {
  const { state, dispatch } = useNotification();
  useEffect(() => {
    if (!state.message) return;

    const id = setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 3000);

    return () => clearTimeout(id);
  }, [state.message]);

  if (!state.message) return null;
  return (
    <div className={styles.content}>
      <IoMdCheckmarkCircleOutline size={16} />
      {state.message}
    </div>
  );
}

export default Notification;
