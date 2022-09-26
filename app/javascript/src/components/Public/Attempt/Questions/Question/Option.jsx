import React from "react";

import { CheckCircle } from "neetoicons";
import { Radio, Tag } from "neetoui";

const Option = ({
  options,
  questionId,
  onOptionChange,
  disableOptions,
  userOption,
}) => (
  <>
    <Radio stacked>
      <div className="space-y-5 mt-5">
        {options.map((option, index) => (
          <div key={index} className="flex items-start h-4">
            <Radio.Item
              className="ml-32"
              label={option.value}
              value={option.value}
              name={questionId}
              onChange={e => onOptionChange(questionId, e)}
              disabled={disableOptions}
              checked={userOption && userOption === option.value}
            ></Radio.Item>
            {option.is_answer && (
              <Tag color="green" label="Correct answer" icon={CheckCircle} />
            )}
          </div>
        ))}
      </div>
    </Radio>
  </>
);

export default Option;
