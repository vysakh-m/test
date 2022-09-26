# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { "Sam" }
    last_name { "Smith" }
    email { "sam@example.com" }
    password { "welcome" }
    password_confirmation { "welcome" }
  end
end
