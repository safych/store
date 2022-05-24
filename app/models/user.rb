# frozen_string_literal: true

class User < ApplicationRecord
  has_many :cart_items
  has_many :tokens
end
