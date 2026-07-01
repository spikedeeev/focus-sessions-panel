import { createContext } from "react";
import type {
  NotificationState,
  NotificationActions,
} from "./notification.type";

export interface NotificationContextType {
  state: NotificationState;
  dispatch: React.Dispatch<NotificationActions>;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
