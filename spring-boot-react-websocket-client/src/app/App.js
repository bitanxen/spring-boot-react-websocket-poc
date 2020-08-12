import React from "react";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import jssExtend from "jss-extend";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";

import store from "./store";
import AppContext from "./AppContext";
import history from "@history";
import routes from "app/configs/RouteConfig";
import { ApplicationTheme, ApplicationLayout } from "@application";
import ApplicationAuthentication from "app/components/auth/ApplicationAuthentication";
import ApplicationAuthorization from "app/components/auth/ApplicationAuthorization";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

function App() {
  return (
    <AppContext.Provider value={{ routes: routes }}>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Router history={history}>
            <ApplicationAuthentication>
              <ApplicationAuthorization>
                <ApplicationTheme>
                  <ApplicationLayout />
                </ApplicationTheme>
              </ApplicationAuthorization>
            </ApplicationAuthentication>
          </Router>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  );
}

export default App;
