const initialState = {
  msg: "",
  notificationType: "success",
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "notification/notificationShown":
      return action.data;
    case "notification/notificationHidden":
      return action.data;
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
      msg: "",
      notificationType: "success",
      open: false,
    },
  };
};

export default reducer;
