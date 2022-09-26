import React from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

const Title = ({ title, count, id, showEditModal, showDeleteAlert }) => (
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
        <Button
          label="Edit"
          icon={Edit}
          style="secondary"
          iconPosition="left"
          onClick={() => showEditModal(id)}
        />
        <Button
          label="Delete"
          icon={Delete}
          style="danger"
          iconPosition="left"
          onClick={() => showDeleteAlert(id)}
        />
      </div>
    </div>
  </div>
);

export default Title;
