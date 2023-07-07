# frozen_string_literal: true

class CartItemsController < ApplicationController
  before_action :check_token!
  before_action :set_cart_item, only: %i[show update destroy]
  before_action :authenticate_admin!, only: %i[index show update destroy]
  before_action :authenticate_user!, only: %i[edit_user_cart show_user_cart
                                              create delete_user_cart]

  def index
    render json: CartItem.all
  end

  def show
    render json: @cart_item
  end

  def show_user_cart
    products = UserCartsListQuery.new(request.headers['User']).list
    render json: products
  end

  def edit_user_cart
    cart_item = CartItem.find(request.headers['Cart'])
    cart_item.update(items_count: params[:items_count])
  end

  def create
    CartItemCreateService.new(request.headers['Product'], request.headers['Count'], request.headers['User']).create
  end

  def update
    if @cart_item.update(cart_item_params)
      render json: @cart_item
    else
      render json: @cart_item.errors, status: :unprocessable_entity
    end
  end

  def delete_user_cart
    cart_item = CartItem.find(request.headers['Cart'])
    cart_item.destroy
  end

  def destroy
    @cart_item.destroy
  end

  private

  def set_cart_item
    @cart_item = CartItem.find(params[:id])
  end

  def cart_item_params
    params.require(:cart_item).permit(:user_id, :product_id, :items_count)
  end
end
