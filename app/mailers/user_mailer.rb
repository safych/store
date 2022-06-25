# frozen_string_literal: true

# require 'mailgun-ruby'

class UserMailer < ApplicationMailer
  def reset_password
    @user = params[:user]
    mail(to: @user.email, subject: 'Код для відновлення паролю')
    # mg_client = Mailgun::Client.new 'your-api-key'
    # message_params = { from: 'bob@sending_domain.com',
    #                    to: @user.email,
    #                    subject: 'Відновлення паролю акаунту',
    #                    text: "Ваш код для відновлення паролю #{@user.recovery_code}" }
    # mg_client.send_message 'sending_domain.com', message_params
  end
end
