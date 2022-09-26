# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @attempt_answer = build(:attempt_answer)
  end

  def test_attempt_answer_should_be_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_should_not_be_valid_without_submitted_status
    @attempt_answer.answer = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Answer can't be blank"
  end

  def test_attempt_should_not_be_valid_without_question
    @attempt_answer.question = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Question must exist"
  end

  def test_attempt_should_not_be_valid_without_attempt
    @attempt_answer.attempt = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Attempt must exist"
  end
end
