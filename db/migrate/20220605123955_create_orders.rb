class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.belongs_to :user, foreign_key: { to_table: :users, on_delete: :cascade }
      t.integer :price, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
