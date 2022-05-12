class CreateCategoriesProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :categories_products do |t|
      t.string :product_id
      t.string :category_id

      t.timestamps
    end
  end
end
