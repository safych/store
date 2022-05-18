# frozen_string_literal: true

class Categorie < ApplicationRecord
  has_many :categories_products
end
