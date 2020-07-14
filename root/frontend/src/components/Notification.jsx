import React from "react";
import { CircularProgress } from "@material-ui/core";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  if (notification.type === "spinner") {
    return (
      <div>
        {notification.message}
        <CircularProgress />
      </div>
    );
  }

  return <div>{notification.message}</div>;
};

export default Notification;
