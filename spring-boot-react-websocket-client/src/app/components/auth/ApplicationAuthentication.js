import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import authService from "app/service/AuthService";
import * as Actions from "app/store/actions";

function ApplicationAuthentication(props) {
  const [processing, setProcessing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .handleAuthentication()
      .then((data) => {
        dispatch(Actions.loadUser());
        setProcessing(false);
      })
      .catch((err) => {
        setProcessing(false);
      });
  }, [dispatch]);

  return (
    <div>
      {processing ? (
        "Processing..."
      ) : (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    </div>
  );
}

export default ApplicationAuthentication;
