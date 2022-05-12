class CreateCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_items do |t|
      t.string :user_id
      t.string :product_id
      t.string :items_count

      t.timestamps
    end
  end
end
