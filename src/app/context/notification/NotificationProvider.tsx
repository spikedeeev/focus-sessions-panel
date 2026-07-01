import { useReducer } from "react";
import { NotificationContext } from "./NotificationContext";
import { notificationReducer } from "./notification.reducer";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: "",
  });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}
