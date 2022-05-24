# frozen_string_literal: true

class ProfilesController < ApplicationController
  def info
    token = Token.find_by(access_token: request.headers['Access-Token'])
    render json: Admin.find(token.admin_id) if token.user_id.nil?
    render json: User.find(token.user_id) if token.admin_id.nil?
  end
end
