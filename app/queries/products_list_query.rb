class ProductsListQuery
  attr_reader :order_id

  def initialize(order_id)
    @order_id = order_id
  end

  def list
    products = []
    order = Order.find(order_id)
    order_items = OrderItem.where(order_id: order.id)
    order_items.map do |a|
      product = Product.find(a.product_id)
      products.push({ id: product.id, name: product.name, size: product.size, price: product.price,
                      image: product.image, count: a.items_count, user: order.user_id })
    end
    products
  end
end