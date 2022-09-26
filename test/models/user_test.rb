# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank", "Email is invalid"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert @user.invalid?
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 51
    assert @user.invalid?
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.update!(email: uppercase_email)
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
                      first.last@example.in user+one@example.ac.in]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_validation_should_reject_emails_not_unique_across_case_sensitivity
    uppercase_email = "SAM@example.com"
    lowercase_email = "sam@example.com"
    @user.update!(email: uppercase_email)
    test_user = @user.dup
    test_user.email = lowercase_email
    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_user_should_have_valid_role
    @user.role = "standard"
    assert @user.valid?
    @user.role = "administrator"
    assert @user.valid?
  end

  def test_user_should_not_have_invalid_role
    assert_raises ArgumentError do
      @user.role = "invalid"
    end
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_password_should_have_minimum_length
    @user.password = "a" * 5
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_user_should_have_matching_password_and_password_confirmation
    @user.password_confirmation = "random"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end

  def test_users_should_have_unique_auth_token
    @user.save!
    second_user = @user.dup
    assert_not_same @user.authentication_token, second_user.authentication_token
  end
end
