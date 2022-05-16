class CreateCategoriesProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :categories_products do |t|
      t.belongs_to :product, foreign_key: { to_table: :products, on_delete: :cascade }
      t.belongs_to :category, foreign_key: { to_table: :categories, on_delete: :cascade }

      t.timestamps
    end
  end
end
