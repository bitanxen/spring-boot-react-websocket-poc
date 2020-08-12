import React from "react";

export const LoginConfig = {
  settings: {
    layout: {
      style: "layout2",
      config: {},
    },
  },
  routes: [
    {
      path: "/public/login",
      component: React.lazy(() => import("./Login")),
    },
  ],
};
