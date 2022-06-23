class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def reset_password
    @user = params[:user]
    mail(to: @user.email, subject: 'Код для відновлення паролю')
  end
end
