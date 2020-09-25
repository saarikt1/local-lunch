const initialState = {
  msg: "",
  notificationType: "success",
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "notification/notificationShown":
      return {
        ...state,
        msg: action.data.msg,
        notificationType: action.data.notificationType,
        open: action.data.open,
      };
    case "notification/notificationHidden":
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
    type: "notification/notificationShown",
    data: {
      msg,
      notificationType,
      open: true,
    },
  };
};

export const hideNotification = () => {
  return {
    type: "notification/notificationHidden",
    data: {
      open: false,
    },
  };
};

export default reducer;
