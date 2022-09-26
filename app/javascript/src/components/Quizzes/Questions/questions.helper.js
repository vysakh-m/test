export const assignAnswerStatus = data => {
  return data.option.map(item => ({
    ...item,
    is_answer: data.answer.value === item.value,
  }));
};
