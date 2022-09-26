# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  has_many :quizzes, foreign_key: :user_id
  has_many :attempts, dependent: :destroy, foreign_key: :user_id

  has_secure_password
  has_secure_token :authentication_token

  enum role: { standard: 0, administrator: 1 }

  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :role, presence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
