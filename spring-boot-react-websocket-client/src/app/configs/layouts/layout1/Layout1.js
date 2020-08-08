import React, { useContext } from "react";
import { renderRoutes } from "react-router-config";

import AppContext from "app/AppContext";

import Layout1Header from "./header/Layout1Header1";
import Layout1Footer from "./footer/Layout1Footer";

function ApplicationLayout1(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div id="application" className="w-full max-h-screen ">
      <Layout1Header />
      <div className="w-full m-2">
        {renderRoutes(routes)}
        {props.children}
      </div>
      <Layout1Footer />
    </div>
  );
}

export default ApplicationLayout1;
