import React from "react";

export const RegisterConfig = {
  settings: {
    layout: {
      style: "layout2",
      config: {},
    },
  },
  routes: [
    {
      path: "/public/register",
      component: React.lazy(() => import("./Register")),
    },
  ],
};
