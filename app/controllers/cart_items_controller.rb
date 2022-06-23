# frozen_string_literal: true

class CartItemsController < ApplicationController
  before_action :check_token!
  before_action :set_cart_item, only: %i[show update destroy]
  before_action :authenticate_admin!, only: %i[index show update destroy]
  before_action :authenticate_user!, only: %i[edit_user_cart show_user_cart
                                              create delete_user_cart]

  def index
    @cart_items = CartItem.all
    render json: @cart_items
  end

  def show
    render json: @cart_item
  end

  def show_user_cart
    products = []
    cart_items = CartItem.where(user_id: request.headers['User'])
    cart_items.map do |a|
      product = Product.find(a.product_id)
      products.push({ id: a.id, name: product.name, size: product.size, price: product.price,
                      image: product.image, count: a.items_count, product: product.id })
    end
    render json: products
  end

  def edit_user_cart
    cart_item = CartItem.find(request.headers['Cart'])
    cart_item.update(items_count: params[:items_count])
  end

  def create
    product = Product.find(request.headers['Product'])
    if product.items_left >= request.headers['Count'].to_i
      cart_item = CartItem.new(user_id: request.headers['User'], product_id: request.headers['Product'],
                               items_count: request.headers['Count'])
      cart_item.save
    end
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

  # Use callbacks to share common setup or constraints between actions.
  def set_cart_item
    @cart_item = CartItem.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def cart_item_params
    params.require(:cart_item).permit(:user_id, :product_id, :items_count)
  end
end
