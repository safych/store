class OrderDeleteService
  def initialize(order_id)
    @order_id = order_id
  end

  def delete
    order = Order.find(@order_id)
    order_items = OrderItem.where(order_id: order.id)
    order_items.map do |a|
      product = Product.find(a[:product_id])
      product.update(items_left: product.items_left + a[:items_count])
      a.destroy
    end
    order.destroy
  end
end