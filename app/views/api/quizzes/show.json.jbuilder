# frozen_string_literal: true

json.quiz do
  json.extract! @quiz,
    :id,
    :title,
    :slug
end

json.questions @quiz.questions do |question|
  json.extract! question,
    :id,
    :title
  json.option question.options do |option|
    json.extract! option,
      :id,
      :value,
      :is_answer
  end
end
