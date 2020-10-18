export const SHOW_NOTIFICATION = "[notification] showNotification";
export const HIDE_NOTIFICATION = "[notification] hideNotification";

export interface NotificationState {
  msg: string;
  notificationType: "success" | "info" | "warning" | "error" | undefined;
  open: boolean;
}

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  data: NotificationState;
}

export interface HideNotificationAction {
  type: typeof HIDE_NOTIFICATION;
  data: {
    open: boolean;
  };
}

export type NotificationActionTypes =
  | ShowNotificationAction
  | HideNotificationAction;
