# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.references :question, null: false, foreign_key: true
      t.string :value, null: false
      t.boolean :is_answer, null: false, default: false
      t.timestamps
    end
  end
end
