# frozen_string_literal: true

class CategoriesProduct < ApplicationRecord
  belongs_to :product, optional: true
  belongs_to :categorie, optional: true
end
