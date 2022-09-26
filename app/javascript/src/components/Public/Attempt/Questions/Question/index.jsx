import React from "react";

import Option from "./Option";
import Title from "./Title";

const Question = ({ question, count, onOptionChange, disableOptions }) => (
  <div>
    <Title title={question.title} count={count} />
    <Option
      options={question.option}
      questionId={question.id}
      onOptionChange={onOptionChange}
      disableOptions={disableOptions}
      userOption={question.user_option}
    />
  </div>
);

export default Question;
