class OrderItemsController < ApplicationController
  before_action :set_order_item, only: %i[show update destroy]
  before_action :authenticate_admin!
  before_action :authenticate_user!, only: %i[create user_order_items]
  skip_before_action :authenticate_admin!, only: %i[create user_order_items]

  def index
    render json: OrderItem.all
  end

  def show
    render json: @order_item
  end

  def user_order_items
    render json: UserOrdersListQuery.new(request.headers['User-Order']).list
  end

  def create
    OrderItemCreateService.new(request.headers['User'], params[:products]).create
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

  def set_order_item
    @order_item = OrderItem.find(params[:id])
  end

  def order_item_params
    params.require(:order_item).permit(:product_id, :order_id, :items_count)
  end
end
