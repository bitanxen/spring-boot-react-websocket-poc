import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";

function ApplicationTheme(props) {
  const mainTheme = useSelector(({ common }) => common.settings.mainTheme);
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default ApplicationTheme;
