import React from "react";

import { Typography } from "neetoui";

const EmptyData = ({ description }) => (
  <div className="my-64 neeto-ui-text-gray-500">
    <Typography style="h3">{description}</Typography>
  </div>
);

export default EmptyData;
