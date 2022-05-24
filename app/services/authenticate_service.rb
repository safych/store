# frozen_string_literal: true

class AuthenticateService
  def initialize(email, password)
    @email = email
    @password = password
  end

  def call_user
    user = User.find_by(email: @email)
    return nil if user.nil?
    return nil if user.password_digest != @password

    user
  end

  def call_admin
    admin = Admin.find_by(email: @email)
    return nil if admin.nil?
    return nil if admin.password_digest != @password

    admin
  end
end
