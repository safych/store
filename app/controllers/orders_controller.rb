class OrdersController < ApplicationController
  before_action :check_token!
  before_action :authenticate_user!, only: %i[user_orders]
  before_action :authenticate_admin!
  skip_before_action :authenticate_admin!, only: %i[user_orders]

  def index
    @orders = Order.all
    render json: @orders
  end

  def wait_orders
    orders = Order.where(status: "Оформлено")
    render json: orders
  end

  def done_orders
    orders = Order.where(status: "Відправлено")
    render json: orders
  end

  def show
    render json: @order
  end

  def user_orders
    orders = Order.where(user_id: request.headers['User'])
    render json: orders
  end

  def done_order
    order = Order.find(request.headers['Order-ID'])
    order.update(status: "Відправлено")
  end

  def delete_order
    order = Order.find(request.headers['Order-ID'])
    order_items = OrderItem.where(order_id: order.id)
    order_items.map do |a|
      product = Product.find(a[:product_id])
      product.update(items_left: product.items_left + a[:items_count])
      a.destroy
    end
    order.destroy
  end

  def info_customer
    order = Order.find(request.headers['Order-ID'])
    user = User.find(order.user_id)
    render json: { name: user.name, surname: user.surname, number_phone: user.number_phone, 
                   price: order.price, status: order.status }
  end

  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:user_id, :price, :status)
    end
end
