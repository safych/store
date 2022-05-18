# frozen_string_literal: true

class CreateCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_items do |t|
      t.belongs_to :user, foreign_key: { to_table: :users, on_delete: :cascade }
      t.belongs_to :product, foreign_key: { to_table: :products, on_delete: :cascade }
      t.string :items_count, null: false

      t.timestamps
    end
  end
end
