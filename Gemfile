# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "rails", "~> 6.1.4", ">= 6.1.4.1"

# database
gem "pg", group: [:production]
gem "sqlite3", "~> 1.4", group: [:development, :test]

# friends of Rails
gem "sass-rails", ">= 6"

gem "webpacker", "~> 5.0"

# Application server
gem "puma", "~> 5.0"

# JSON builder
gem "jbuilder", "~> 2.7"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

group :development, :test do
  # default debugger
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  # For code formatting and linting
  gem "rubocop"
  gem "rubocop-rails"
  # Rails integration for factory_bot, a replacement for fixtures
  gem "factory_bot_rails"
  # For auto-generating demo data
  gem "faker"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code
  gem "web-console", ">= 4.1.0"
  # Reenable after https://github.com/rails/rails/issues/26158 is fixed
  gem "listen", "~> 3.3"
  # Speeds up development by keeping your application running in the background
  gem "spring"
end

group :test do
end

# Hashing password
gem "bcrypt", "~> 3.1.13"

# Frontend library
gem "react-rails"

# Authorization
gem "pundit"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]

# Background Job
gem "sidekiq"
gem "sidekiq-status"

# Handling Excel file
gem "axlsx"
