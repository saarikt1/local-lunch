import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  ShowNotificationAction,
  HideNotificationAction,
  NotificationActionTypes,
  NotificationState,
} from "./notificationTypes";

const initialState: NotificationState = {
  msg: "",
  notificationType: "success",
  open: false,
};

export const notificationReducer = (
  state = initialState,
  action: NotificationActionTypes
): NotificationState => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        msg: action.data.msg,
        notificationType: action.data.notificationType,
        open: action.data.open,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        open: action.data.open,
      };
    default:
      return state;
  }
};

export const showNotification = (
  msg: string,
  notificationType: string
): ShowNotificationAction => {
  return {
    type: SHOW_NOTIFICATION,
    data: {
      msg,
      notificationType,
      open: true,
    },
  };
};

export const hideNotification = (): HideNotificationAction => {
  return {
    type: HIDE_NOTIFICATION,
    data: {
      open: false,
    },
  };
};
