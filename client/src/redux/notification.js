export const SHOW_NOTIFICATION = "[notification] showNotification";
const HIDE_NOTIFICATION = "[notification] hideNotification";

const initialState = {
  msg: "",
  notificationType: "success",
  open: false,
};

const reducer = (state = initialState, action) => {
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

export const showNotification = (msg, notificationType) => {
  return {
    type: SHOW_NOTIFICATION,
    data: {
      msg,
      notificationType,
      open: true,
    },
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
    data: {
      open: false,
    },
  };
};

export default reducer;
