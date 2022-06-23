# frozen_string_literal: true

require_relative '../errors/reponses/unauthorized_error'

class ApplicationController < ActionController::API
  rescue_from Responses::UnauthorizedError do
    head(:unauthorized)
  end

  private

  def authenticate_user!
    raise Responses::UnauthorizedError if current_user.nil?
  end

  def authenticate_admin!
    raise Responses::UnauthorizedError if current_admin.nil?
  end

  def check_token!
    token = Token.find_by(access_token: request.headers['Authorization'])
    token.destroy if token.expire_at < DateTime.now
  end

  def current_user
    @current_user = Token.find_by(access_token: request.headers['Authorization'])&.user
  end

  def current_admin
    @current_admin = Token.find_by(access_token: request.headers['Authorization'])&.admin
  end
end
