# frozen_string_literal: true

class AddUniqueIndexForSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :quizzes, :slug, unique: true
  end
end
