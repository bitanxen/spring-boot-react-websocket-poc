import React from "react";
import { Redirect } from "react-router-dom";
import { generateRoutesFromConfigs } from "@application";

import { ComponentRouteConfig } from "../components/ComponentRoutes";

const routesConfig = [...ComponentRouteConfig];

const routes = [
  ...generateRoutesFromConfigs(routesConfig, null),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
  {
    component: () => <Redirect to="/error/404" />,
  },
];

export default routes;
