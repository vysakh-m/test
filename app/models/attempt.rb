# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers
  validates :submitted, inclusion: { in: [true, false], message: "must exist" }
end
