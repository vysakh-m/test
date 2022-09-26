# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    value { Faker::Lorem.sentence[0..24] }
    is_answer { Faker::Boolean.boolean(true_ratio: 0) }
    question
  end
end
