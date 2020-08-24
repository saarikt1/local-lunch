const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "notification/notificationShown":
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
    },
  };
};

export default reducer;
