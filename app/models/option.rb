# frozen_string_literal: true

class Option < ApplicationRecord
  MAX_OPTION_LENGTH = 25
  belongs_to :question

  validates :value, presence: true, length: { maximum: MAX_OPTION_LENGTH }
end
