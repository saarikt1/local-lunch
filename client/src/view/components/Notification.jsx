import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { hideNotification } from "../../redux/notification";
import { useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <div id="notificationContainer" className={classes.root}>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={notification.notificationType}>
          {notification.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
