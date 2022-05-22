# frozen_string_literal: true

class ProfilesController < ApplicationController
  def info
    token = Token.find_by(access_token: request.headers['Access-Token'])
    render json: User.find(token.user_id)
  end
end
