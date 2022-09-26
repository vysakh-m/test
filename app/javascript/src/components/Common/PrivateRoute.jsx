import React from "react";

import PropTypes from "prop-types";
import { either, isEmpty, isNil } from "ramda";
import { Redirect, Route } from "react-router-dom";

import { getFromLocalStorage } from "helpers/storage";

const PrivateRoute = ({ component: Component, path, ...props }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  if (!isLoggedIn) {
    const destination = { pathname: "/login", from: props.location };
    return <Redirect to={destination} />;
  }

  return <Route path={path} component={Component} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
