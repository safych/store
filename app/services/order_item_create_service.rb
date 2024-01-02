class OrderItemCreateService
  def initialize(user, products)
    @user = user
    @products = products
  end

  def create
    create_order
    price = 0
    @products.map do |a|
      price += a[:price] * a[:count]
      @cart = CartItem.find(a[:id])
      product.update(items_left: product.items_left - a[:count])
      order_item = OrderItem.new(product_id: @cart.product_id, order_id: @order.id, items_count: a[:count])
      order_item.save
      @cart.destroy
      product.destroy if product.items_left.eql? 0
    end
    @order.update(price: price)
  end

  def create_order
    @order = Order.new(user_id: @user, price: 0, status: "Оформлено")
    @order.save
  end

  def product
    product ||= Product.find(@cart.product_id)
  end
end