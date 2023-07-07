class OrdersController < ApplicationController
  before_action :check_token!
  before_action :authenticate_user!, only: %i[user_orders]
  before_action :authenticate_admin!
  skip_before_action :authenticate_admin!, only: %i[user_orders]

  def index
    render json: Order.all
  end

  def wait_orders
    render json: Order.where(status: "Оформлено")
  end

  def done_orders
  
    render json: Order.where(status: "Відправлено")
  end

  def show
    render json: @order
  end

  def user_orders 
    render json: Order.where(user_id: request.headers['User'])
  end

  def done_order
    order = Order.find(request.headers['Order-ID'])
    order.update(status: "Відправлено")
  end

  def delete_order
    OrderDeleteService.new(request.headers['Order-ID']).delete
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

  def set_order
    @order = Order.find(params[:id])
  end

  def order_params
    params.require(:order).permit(:user_id, :price, :status)
  end
end
