import React from "react";

import PropTypes from "prop-types";

import NavBar from "./NavBar";

const Container = ({ children }) => (
  <>
    <NavBar />
    <div>{children}</div>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
