class CreateFavoriteProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :favorite_products do |t|
      t.belongs_to :user, foreign_key: { to_table: :users, on_delete: :cascade }
      t.belongs_to :product, foreign_key: { to_table: :products, on_delete: :cascade }

      t.timestamps
    end
  end
end
