# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    submitted { Faker::Boolean.boolean }
    quiz
    user
  end
end
