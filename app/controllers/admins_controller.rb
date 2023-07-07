# frozen_string_literal: true

class AdminsController < ApplicationController
  before_action :check_token!
  before_action :set_admin, only: %i[show update destroy]
  before_action :authenticate_admin!

  def index
    render json: Admin.all
  end

  def balance
    price = 0
    orders = Order.where(status: "Відправлено")
    orders.map do |a|
      price += a.price
    end
    render json: price
  end

  def show
    render json: @admin
  end

  def create
    admin = Admin.new(admin_params)
    admin.password = params[:password_digest]
    admin.save!
  end

  def update
    if @admin.update(admin_params)
      render json: @admin
    else
      render json: @admin.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @admin.destroy
  end

  private

  def set_admin
    @admin = Admin.find(params[:id])
  end

  def admin_params
    params.require(:admin).permit(:name, :email, :password_digest)
  end
end
