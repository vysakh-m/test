# frozen_string_literal: true

json.attempt do
  json.extract! @attempt,
    :correct_answers_count,
    :incorrect_answers_count
end

json.quiz do
  json.extract! @attempt.quiz,
    :id,
    :title
end

json.questions @attempt.quiz.questions do |question|
  json.extract! question,
    :id,
    :title
  json.option question.options do |option|
    json.extract! option,
      :id,
      :value,
      :is_answer
  end
  @attempt.attempt_answers.each do |answer|
    if question.id == answer.question_id
      json.user_option answer.answer
    end
  end
end
