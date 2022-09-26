# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @attempt = build(:attempt)
  end

  def test_attempt_should_be_valid
    assert @attempt.valid?
  end

  def test_attempt_should_not_be_valid_without_submitted_status
    @attempt.submitted = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Submitted must exist"
  end

  def test_attempt_should_not_be_valid_without_quiz
    @attempt.quiz = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Quiz must exist"
  end

  def test_attempt_should_not_be_valid_without_user
    @attempt.user = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "User must exist"
  end
end
