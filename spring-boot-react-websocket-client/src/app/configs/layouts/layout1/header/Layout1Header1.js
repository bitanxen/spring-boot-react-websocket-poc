import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function Layout1Header(props) {
  const classes = useStyles(props);
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolBar}>
          <Typography variant="body1" color="inherit">
            TalkFest
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Layout1Header;
