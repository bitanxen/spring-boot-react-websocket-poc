import React, { useContext } from "react";
import { renderRoutes } from "react-router-config";

import AppContext from "app/AppContext";

function ApplicationLayout2(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <div>
      <div>{renderRoutes(routes)}</div>
      {props.children}
    </div>
  );
}

export default ApplicationLayout2;
