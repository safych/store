# frozen_string_literal: true

class Product < ApplicationRecord
  has_many :categories_products
  has_many :cart_items
  has_many :order_items
  has_many :favorite_products
end
