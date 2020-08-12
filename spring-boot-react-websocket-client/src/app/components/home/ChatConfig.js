import React from "react";

export const ChatConfig = {
  settings: {
    layout: {
      style: "layout1",
      config: {},
    },
  },
  routes: [
    {
      path: "/app/chat",
      component: React.lazy(() => import("./Chat")),
    },
  ],
};
