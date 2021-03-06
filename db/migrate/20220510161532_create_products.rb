# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :size, null: false
      t.integer :items_left, null: false
      t.integer :price, null: false
      t.string :image, null: false

      t.timestamps
    end
  end
end
