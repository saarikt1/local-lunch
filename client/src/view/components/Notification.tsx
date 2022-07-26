// import React from "react";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";
// import { useSelector } from "react-redux";
// import { hideNotification } from "../../redux/notification";
// import { useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";

// type AlertProps = {
//   onClose: (event: React.SyntheticEvent<Element, Event>) => void;
//   severity: "success" | "info" | "warning" | "error" | undefined;
//   children: string;
// };

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// const Notification = () => {
//   const notification = useSelector((state: RootState) => state.notification);
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const handleClose = (_event: React.SyntheticEvent<Element, Event>) => {
//     dispatch(hideNotification());
//   };

//   return (
//     <div id="notificationContainer" className={classes.root}>
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleClose} severity={notification.notificationType}>
//           {notification.msg}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Notification;

export {}
