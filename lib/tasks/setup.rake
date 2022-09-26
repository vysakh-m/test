# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke
end

task populate_with_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

def create_sample_data!
  puts "Seeding with sample data..."
  create_user! email: "sam@example.com", first_name: "Sam", last_name: "Smith", role: "administrator"
  puts 'Done! Created user with email "sam@example.com" & password "welcome"'
end

def create_user!(options = {})
  user_attributes = { password: "welcome", password_confirmation: "welcome" }
  attributes = user_attributes.merge options
  User.create! attributes
end
