import React from "react";
import { Redirect } from "react-router-dom";
import { generateRoutesFromConfigs } from "@application";

import { ComponentRouteConfig } from "../components/ComponentRoutes";

const routesConfig = [...ComponentRouteConfig];

const routes = [
  ...generateRoutesFromConfigs(routesConfig, null),
  {
    path: "/app/",
    exact: true,
    component: () => <Redirect to="/app/chat" />,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/app/chat" />,
  },
  {
    component: () => <Redirect to="/error/404" />,
  },
];

export default routes;
