class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.belongs_to :product, foreign_key: { to_table: :products, on_delete: :cascade }
      t.belongs_to :order, foreign_key: { to_table: :orders, on_delete: :cascade }
      t.integer :items_count, null: false

      t.timestamps
    end
  end
end
