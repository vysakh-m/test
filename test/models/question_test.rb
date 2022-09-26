# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = build(:question, options: [build(:option), build(:option, is_answer: true)])
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_question_should_not_be_valid_and_saved_without_title
    @question.title = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Title can't be blank"
  end

  def test_question_title_should_not_exceed_maximum_length
    @question.title = "a" * 101
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Title is too long (maximum is 100 characters)"
  end

  def test_question_should_not_be_valid_without_quiz
    @question.quiz = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end

  def test_question_should_have_atleast_two_options
    question = build(:question, options: [build(:option)])
    assert_not question.valid?
    assert_includes question.errors.full_messages, "Options cannot be less than 2"
  end

  def test_question_should_have_atmost_four_options
    3.times do
      @question.options << build(:option, question: @question)
    end
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options cannot be more than 4"
  end

  def test_question_should_have_atleast_one_correct_option
    question = build(:question, options: [build(:option), build(:option)])
    assert_not question.valid?
    assert_includes question.errors.full_messages, "Options should have one correct answer"
  end

  def test_question_should_not_have_more_than_one_correct_option
    question = build(:question, options: [build(:option, is_answer: true), build(:option, is_answer: true)])
    assert_not question.valid?
    assert_includes question.errors.full_messages, "Options should have one correct answer"
  end
end
