# frozen_string_literal: true

require 'securerandom'
require './app/services/authenticate_service'

class TokensController < ApplicationController
  def create
    user = AuthenticateService.new(params[:email], params[:password_digest]).call
    return head(401) if user.nil?

    token = Token.new(user: user, access_token: SecureRandom.hex,
                      expire_at: 1.week.from_now)

    if token.save
      render(json: token, status: :created)
    else
      render(json: token.errors, status: :unprocessable_entity)
    end
  end

  def destroy
    token = Token.find_by(access_token: request.headers['Access-Token'])
    token.destroy
    head(:no_content)
  end
end
