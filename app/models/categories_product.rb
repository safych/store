# frozen_string_literal: true

class CategoriesProduct < ApplicationRecord
  belongs_to :product
  belongs_to :category
end
