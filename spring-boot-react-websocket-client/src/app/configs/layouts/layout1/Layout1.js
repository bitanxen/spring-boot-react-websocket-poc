import React, { useContext } from "react";
import { renderRoutes } from "react-router-config";

import AppContext from "app/AppContext";

import Layout1Header from "./header/Layout1Header1";

function ApplicationLayout1(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div
      id="application"
      className="w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between"
    >
      <Layout1Header />
      <div className="w-full h-full">
        {renderRoutes(routes)}
        {props.children}
      </div>
    </div>
  );
}

export default ApplicationLayout1;
