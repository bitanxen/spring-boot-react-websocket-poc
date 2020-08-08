import React from "react";

export const HomeConfig = {
  settings: {
    layout: {
      style: "layout1",
      config: {},
    },
  },
  routes: [
    {
      path: "/home",
      component: React.lazy(() => import("./Home")),
    },
  ],
};
