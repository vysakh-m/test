import React from "react";

import { CheckCircle } from "neetoicons";
import { Typography, Tag } from "neetoui";

const Option = ({ options }) => (
  <>
    {options
      .sort((option1, option2) => option1.id - option2.id)
      .map((option, index) => (
        <div key={index} className="flex items-center">
          <Typography
            className="w-32 neeto-ui-text-gray-600 font-medium leading-6"
            style="body2"
          >
            Option {index + 1}
          </Typography>
          <Typography className="leading-6" style="h5">
            {option.value}
          </Typography>
          {option.is_answer && (
            <Tag
              className="ml-2"
              color="green"
              label="Correct answer"
              icon={CheckCircle}
            />
          )}
        </div>
      ))}
  </>
);

export default Option;
