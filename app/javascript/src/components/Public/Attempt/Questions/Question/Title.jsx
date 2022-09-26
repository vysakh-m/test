import React from "react";

import { Typography } from "neetoui";

const Title = ({ title, count }) => (
  <div className="flex pb-1">
    <div className="flex items-center">
      <Typography
        className="neeto-ui-text-gray-600 w-32 font-medium"
        style="body2"
      >
        {`Question ${count}`}
      </Typography>
      <div className="flex space-x-4 items-center">
        <Typography className="font-extrabold" style="h5">
          {title}
        </Typography>
      </div>
    </div>
  </div>
);

export default Title;
