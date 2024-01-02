# frozen_string_literal: true

require 'bcrypt'

class User < ApplicationRecord
  has_many :cart_items
  has_many :tokens
  has_many :orders
  has_many :favorite_products

  include BCrypt

  def password
    @password ||= Password.new(password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end
end
