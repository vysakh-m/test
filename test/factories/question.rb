# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    title { Faker::Lorem.sentence[0..99] }
    quiz
  end
end
