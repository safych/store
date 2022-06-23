# frozen_string_literal: true

require './app/services/authenticate_service'
require 'securerandom'

class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]
  before_action :authenticate_admin!
  skip_before_action :authenticate_admin!, only: %i[create update_password
                                                    update_name_surname update_number_phone
                                                    reset_password reset_update_password]
  before_action :authenticate_user!, only: %i[update_password set_user update_name_surname
                                              update_number_phone update_email]

  def reset_password
    user = User.find_by(email: request.headers['Email'])
    user.update(recovery_code: SecureRandom.hex(4))

    if !user.nil?
      UserMailer.with(user: user).reset_password.deliver_now
      render json: true
    end
  end

  def reset_update_password
    user = User.find_by(email: request.headers['Email'])
    if user.recovery_code.eql? request.headers['Recovery-Code']
      password = BCrypt::Password.create(request.headers['New-Password'])
      user.update(password_digest: password, recovery_code: nil)
    end
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def search_user_by_phone
    user = User.find_by(number_phone: request.headers['User-Phone'])
    render json: { name: user.name, surname: user.surname, email: user.email,
                   password_digest: user.password_digest, number_phone: user.number_phone }
  end

  def search_user_by_email
    user = User.find_by(email: request.headers['User-Email'])
    render json: { name: user.name, surname: user.surname, email: user.email,
                   password_digest: user.password_digest, number_phone: user.number_phone }
  end

  def update_password
    token = Token.find_by(access_token: request.headers['Access-Token'])
    data = User.find(token.user_id)
    user = AuthenticateService.new(data.email, request.headers['Old-Password']).call_user
    password = BCrypt::Password.create(request.headers['New-Password'])
    user.update(password_digest: password)
  end

  def update_name_surname
    user = User.find(request.headers['User'])
    user.update(name: params[:name], surname: params[:surname])
  end

  def update_number_phone
    user = User.find(request.headers['User'])
    user.update(number_phone: params[:number_phone])
  end

  def update_email
    user = User.find(request.headers['User'])
    user.update(email: params[:email])
  end

  def create
    data = RegistrationService.new(params[:name], params[:surname], params[:email],
                                   params[:password_digest], params[:number_phone]).check_data

    if data == true
      user = User.new(name: params[:name], surname: params[:surname],
                      email: params[:email], password_digest: params[:password_digest],
                      number_phone: params[:number_phone], recovery_code: nil)
      user.password = params[:password_digest]
      user.save!
    else
      return head(401)
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:name, :surname, :email, :password_digest, :number_phone, :recovery_code)
  end
end
