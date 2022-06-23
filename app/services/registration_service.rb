# frozen_string_literal: true

class RegistrationService
  def initialize(name, surname, email, password, number_phone)
    @name = name
    @surname = surname
    @email = email
    @password = password
    @number_phone = number_phone
  end

  def check_data
    user_by_email = User.find_by(email: @email)
    user_by_number_phone = User.find_by(number_phone: @number_phone)
    if !user_by_email.nil? || !user_by_number_phone.nil? || @password.length < 8 ||
       @name == '' || @surname == '' || @number_phone == '' || @email == ''
      return false
    end

    true
  end
end
