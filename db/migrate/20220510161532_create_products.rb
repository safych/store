class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :size
      t.integer :items_left
      t.integer :price

      t.timestamps
    end
  end
end
