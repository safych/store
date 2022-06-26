# frozen_string_literal: true

class AdminsController < ApplicationController
  before_action :check_token!
  before_action :set_admin, only: %i[show update destroy]
  before_action :authenticate_admin!

  # GET /admins
  def index
    @admins = Admin.all
    render json: @admins
  end

  def balance
    price = 0
    orders = Order.where(status: "Відправлено")
    orders.map do |a|
      price += a.price
    end
    render json: price
  end

  # GET /admins/1
  def show
    render json: @admin
  end

  # POST /admins
  def create
    admin = Admin.new(admin_params)
    admin.password = params[:password_digest]
    admin.save!
  end

  # PATCH/PUT /admins/1
  def update
    if @admin.update(admin_params)
      render json: @admin
    else
      render json: @admin.errors, status: :unprocessable_entity
    end
  end

  # DELETE /admins/1
  def destroy
    @admin.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin
    @admin = Admin.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_params
    params.require(:admin).permit(:name, :email, :password_digest)
  end
end
