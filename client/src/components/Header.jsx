import React from "react";
import { Typography } from "@material-ui/core";

const Header = () => {
  return (
    <div>
      <Typography id="page-header" variant="h4" align="center" gutterBottom>
        Lunch Near Me
      </Typography>
      <Typography id="subtitle" variant="subtitle1" align="center" gutterBottom>
        Here's the help you need to choose where to go for lunch today.
      </Typography>
    </div>
  );
};

export default Header;
