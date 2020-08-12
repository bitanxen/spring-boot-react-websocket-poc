import React, { Suspense, useContext, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";

import * as Actions from "app/store/actions";
import ApplicationLoading from "../ApplicationLoading/ApplicationLoading";
import ApplicationLayouts from "app/configs/layouts/ApplicationLayouts";
import _ from "@lodash";
import AppContext from "app/AppContext";

function ApplicationLayout(props) {
  const dispatch = useDispatch();
  const settings = useSelector(({ common }) => common.settings);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  const routeSettingsCheck = useCallback(() => {
    const matched = matchRoutes(routes, props.location.pathname)[0];

    if (matched && matched.route.settings) {
      const routeSettings = _.merge(
        {},
        settings.current,
        matched.route.settings
      );
      if (!_.isEqual(settings.current, routeSettings)) {
        dispatch(Actions.setSettings(_.merge({}, routeSettings)));
      }
    }
  }, [routes, settings, props.location.pathname, dispatch]);

  useEffect(() => {
    routeSettingsCheck();
  }, [routeSettingsCheck]);

  const Layout = ApplicationLayouts[settings.current.layout.style];

  return (
    <Suspense fallback={<ApplicationLoading />}>
      <Layout {...props} />
    </Suspense>
  );
}

export default withRouter(React.memo(ApplicationLayout));
