// import React, { useState } from "react";
// import { Formik, Field, Form } from "formik";
// import { Box, Typography, Button } from "@material-ui/core";
// import SearchResults from "./SearchResults";
// import { calculateBoundingBoxAroundLocation } from "../../../redux/utils";
// import { TextField } from "formik-material-ui";
// import axios from "axios";
// import * as Yup from "yup";
// import { makeStyles } from "@material-ui/core/styles";
// import { showNotification } from "../../../redux/notification";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

// const useStyles = makeStyles({
//   textField: {
//     minWidth: "250px",
//   },
// });

// const RestaurantForm = () => {
//   const userLocation = useSelector(
//     (state: RootState) => state.location.coordinates
//   );
//   const [searchResults, setSearchResults] = useState([]);
//   const [initialFormValues, setInitialFormValues] = useState({
//     name: "",
//     subtitle: "",
//     website: "",
//     latlon: "",
//   });
//   const classes = useStyles();
//   const dispatch = useDispatch();

//   const fetchSearchResults = async (searchQuery: string) => {
//     const { x1, y1, x2, y2 } = calculateBoundingBoxAroundLocation(userLocation);

//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchQuery}&format=json&limit=5&viewbox=${x1},${y1},${x2},${y2}&extratags=1&bounded=1`
//     );
//     let data = await response.json();
//     if (data.length) {
//       console.log(data);
//       setSearchResults(data);
//     } else {
//       alert("No search results found");
//     }
//   };

//   const fillFormWithData = (
//     name: string,
//     subtitle: string,
//     website: string,
//     latlon: string
//   ): void => {
//     setInitialFormValues({
//       name: name,
//       subtitle: subtitle,
//       website: website,
//       latlon: latlon,
//     });
//   };

//   return (
//     <Box>
//       <Typography variant="h4">Add a new restaurant</Typography>
//       <Formik
//         initialValues={{
//           search: "",
//         }}
//         onSubmit={(values, { resetForm }) => {
//           fetchSearchResults(JSON.stringify(values.search));
//           resetForm();
//           dispatch(showNotification("Search done!", "success"));
//         }}
//       >
//         <Form>
//           <label htmlFor="search">
//             Search for a restaurant from Open Street Map data
//           </label>
//           <br />
//           <Field
//             component={TextField}
//             className={classes.textField}
//             label="Restaurant name"
//             name="search"
//             type="text"
//           />
//           <br />
//           <Button color="primary" type="submit">
//             Search
//           </Button>
//         </Form>
//       </Formik>
//       <SearchResults
//         searchResults={searchResults}
//         fillFormWithData={fillFormWithData}
//       />

//       <Typography variant="h6">Add manually</Typography>
//       <Formik
//         enableReinitialize={true}
//         initialValues={initialFormValues}
//         validationSchema={Yup.object({
//           name: Yup.string()
//             .max(40, "Must be 40 characters or less")
//             .required("Required"),
//           website: Yup.string().url("Must be a valid url"),
//           latlon: Yup.string().required("Required"),
//         })}
//         onSubmit={async (values, { resetForm }) => {
//           const params = {
//             name: values.name,
//             subtitle: values.subtitle,
//             website: values.website,
//             latlon: `(${values.latlon})`,
//           };
//           await axios.post("/restaurants", params);
//           dispatch(
//             showNotification(
//               `Restaurant ${values.name} added to the database!`,
//               "success"
//             )
//           );
//           resetForm();
//         }}
//       >
//         {(props) => (
//           <Form>
//             <Field
//               component={TextField}
//               className={classes.textField}
//               label="Name"
//               name="name"
//               type="text"
//             />
//             <br />

//             <Field
//               component={TextField}
//               className={classes.textField}
//               label="Specifier"
//               name="subtitle"
//               type="text"
//             />
//             <br />

//             <Field
//               component={TextField}
//               className={classes.textField}
//               label="Website"
//               name="website"
//               type="text"
//             />
//             <br />

//             <Field
//               component={TextField}
//               className={classes.textField}
//               label="Coordinates lat, lng"
//               name="latlon"
//               type="text"
//             />
//             <br />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disableElevation
//               disabled={!props.isValid}
//             >
//               Add restaurant
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default RestaurantForm;

export {}
