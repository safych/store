class OrderItemsController < ApplicationController
  before_action :set_order_item, only: %i[show update destroy]
  before_action :authenticate_admin!
  before_action :authenticate_user!, only: %i[create user_order_items]
  skip_before_action :authenticate_admin!, only: %i[create user_order_items]

  def index
    @order_items = OrderItem.all

    render json: @order_items
  end

  def show
    render json: @order_item
  end

  def user_order_items
    products = []
    order_items = OrderItem.where(order_id: request.headers['User-Order'])
    order_items.map do |a|
      product = Product.find(a.product_id)
      products.push({ id: a.id, name: product.name, size: product.size, price: product.price,
                      image: product.image, count: a.items_count })
    end
    render json: products
  end

  def create
    order = Order.new(user_id: request.headers['User'], price: 0, status: "Оформлено")
    order.save
    price = 0
    products = params[:products]
    products.map do |a|
      price += a[:price] * a[:count]
      cart = CartItem.find(a[:id])
      product = Product.find(cart.product_id)
      product.update(items_left: product.items_left - a[:count])
      order_item = OrderItem.new(product_id: cart.product_id, order_id: order.id, items_count: a[:count])
      order_item.save
      cart.destroy
      product.destroy if product.items_left.eql? 0
    end
    order.update(price: price)
  end

  def update
    if @order_item.update(order_item_params)
      render json: @order_item
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @order_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_item_params
      params.require(:order_item).permit(:product_id, :order_id, :items_count)
    end
end
