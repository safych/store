# frozen_string_literal: true

require 'bcrypt'

class Admin < ApplicationRecord
  has_many :tokens
  include BCrypt

  def password
    @password ||= Password.new(password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end
end
