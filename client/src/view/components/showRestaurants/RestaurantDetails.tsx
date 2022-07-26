// import * as React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Link,
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@material-ui/core";
// import Skeleton from "@material-ui/lab/Skeleton";
// import { Restaurant } from "../../../redux/restaurantTypes";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 296,
//     minWidth: 250,
//     margin: "8px 8px",
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 4px",
//   },
//   skeleton: {
//     marginLeft: "8px",
//     marginBottom: "8px",
//   },
// });

// type RestaurantDetailsProps = {
//   restaurant: Restaurant;
// };

// const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="h2">
//           {restaurant ? restaurant.name : <Skeleton />}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         {restaurant ? (
//           <Button size="small" color="primary">
//             {restaurant.website && (
//               <Link href={restaurant.website}>Website</Link>
//             )}
//           </Button>
//         ) : (
//           <Skeleton
//             variant="rect"
//             width={56}
//             height={22}
//             className={classes.skeleton}
//           />
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default RestaurantDetails;

export {}
