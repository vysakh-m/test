# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @option = build(:option)
  end

  def test_option_should_be_valid
    assert @option.valid?
  end

  def test_option_should_not_be_valid_and_saved_without_value
    @option.value = ""
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Value can't be blank"
  end

  def test_option_title_should_not_exceed_maximum_length
    @option.value = "a" * 26
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Value is too long (maximum is 25 characters)"
  end

  def test_option_should_not_be_valid_without_question
    @option.question = nil
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Question must exist"
  end
end
