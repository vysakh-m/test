import React from "react";

import { Typography } from "neetoui";

const NavItem = ({ name, onClick }) => (
  <Typography
    style="h5"
    className="hover:neeto-ui-text-gray-600 cursor-pointer"
    onClick={onClick}
  >
    {name}
  </Typography>
);

export default NavItem;
