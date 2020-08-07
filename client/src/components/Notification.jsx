// import React from "react";
// import { CircularProgress } from "@material-ui/core";

// const Notification = ({ notification }) => {
//   if (notification === null) {
//     return null;
//   }

//   if (notification.type === "spinner") {
//     return (
//       <div>
//         {notification.message}
//         <CircularProgress />
//       </div>
//     );
//   }

//   return <div>{notification.message}</div>;
// };

// export default Notification;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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

const Notification = ({ notification }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (notification === null) {
    return null;
  } else {
    return (
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="warning">
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default Notification;
