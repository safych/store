# frozen_string_literal: true

# require 'mailgun-ruby'

class UserMailer < ApplicationMailer
  def reset_password
    @user = params[:user]
    mail(to: @user.email, subject: 'Код для відновлення паролю')
  end
end
