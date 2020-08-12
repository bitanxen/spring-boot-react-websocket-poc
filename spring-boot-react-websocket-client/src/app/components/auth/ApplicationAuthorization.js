import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppContext from "app/AppContext";

class ApplicationAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userId } = props;
    const { pathname } = location;

    const app = pathname.split("/");
    if (app[1].length === 0) {
      return { accessGranted: true };
    } else if (app[1] === "public") {
      if (userId === null) return { accessGranted: true };
      else return { accessGranted: false };
    } else if (app[1] === "app") {
      if (userId !== null) return { accessGranted: true };
      else return { accessGranted: false };
    } else if (app[1] === "page") {
      return { accessGranted: true };
    } else {
      return { accessGranted: false };
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  redirectRoute() {
    const { location, userId, history } = this.props;
    const { pathname, state } = location;
    const redirectUrl = state && state.redirectUrl ? state.redirectUrl : "/";
    if (userId === null) {
      history.push({
        pathname: "/public/login",
        state: { redirectUrl: pathname },
      });
    } else {
      history.push({
        pathname: redirectUrl,
      });
    }
  }

  render() {
    return this.state.accessGranted ? (
      <React.Fragment>{this.props.children}</React.Fragment>
    ) : null;
  }
}

function mapStateToProps({ auth }) {
  return {
    userId: auth.user.userId,
  };
}

ApplicationAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(ApplicationAuthorization));
