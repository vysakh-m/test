# frozen_string_literal: true

json.attempts @attempt do |attempt|
  json.extract! attempt,
    :correct_answers_count,
    :incorrect_answers_count
  json.email attempt.user.email
  json.user_name "#{attempt.user.first_name} #{attempt.user.last_name}"
  json.quiz_name attempt.quiz.title
end
