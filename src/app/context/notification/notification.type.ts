export interface NotificationState {
  message: string;
}

export type NotificationActions =
  | {
      type: "SHOW";
      payload: string;
    }
  | {
      type: "HIDE";
    };
