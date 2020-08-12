import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Layout1Header(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="body1" color="inherit">
            TalkFest
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Layout1Header;
