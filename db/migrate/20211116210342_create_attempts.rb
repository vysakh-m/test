# frozen_string_literal: true

class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|
      t.references :quiz, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :submitted, null: false
      t.timestamps
    end
  end
end
