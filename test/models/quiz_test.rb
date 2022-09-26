# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = build(:quiz)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_should_not_be_valid_without_title
    @quiz.title = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Title can't be blank"
  end

  def test_quiz_should_not_be_valid_without_user
    @quiz.user = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "User must exist"
  end

  def test_quiz_title_should_not_exceed_maximum_length
    @quiz.title = "a" * 26
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Title is too long (maximum is 25 characters)"
  end

  def test_quiz_slug_is_parameterized_title
    title = @quiz.title
    @quiz.set_slug
    assert @quiz.valid?
    assert_equal title.parameterize, @quiz.slug
  end

  def test_incremental_slug_generation_for_quizzes_with_duplicate_multiple_worded_titles
    first_quiz = @quiz
    second_quiz = @quiz.dup
    first_quiz.set_slug
    first_quiz.save
    second_quiz.set_slug
    assert_equal "solar-system-quiz", first_quiz.slug
    assert_equal "solar-system-quiz-2", second_quiz.slug
  end
end
