# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_QUESTION_LENGTH = 100
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true, limit: 4

  validates :title, presence: true, length: { maximum: MAX_QUESTION_LENGTH }
  validates_length_of :options, within: 2..4, too_long: "cannot be more than 4", too_short: "cannot be less than 2"
  before_validation :validate_answer_count

  private

    def validate_answer_count
      answer_count = self.options.select { |option| option[:is_answer] && !option.marked_for_destruction? }.length
      if answer_count != 1
        errors.add(:options, "should have one correct answer")
      end
    end
end
