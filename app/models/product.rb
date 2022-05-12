class Product < ApplicationRecord
    has_many :categories_products
    has_many :cart_items
end
