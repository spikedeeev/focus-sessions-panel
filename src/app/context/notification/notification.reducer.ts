import type {
  NotificationActions,
  NotificationState,
} from "./notification.type";

export const notificationReducer = (
  state: NotificationState,
  action: NotificationActions,
): NotificationState => {
  switch (action.type) {
    case "SHOW":
      return {
        message: action.payload,
      };

    case "HIDE":
      return {
        message: "",
      };

    default:
      return state;
  }
};
