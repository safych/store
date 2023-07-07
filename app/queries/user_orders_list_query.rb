class UserOrdersListQuery
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def list
    products = []
    order_items = OrderItem.where(order_id: @user)
    order_items.map do |a|
      product = Product.find(a.product_id)
      products.push({ id: a.id, name: product.name, size: product.size, price: product.price,
                      image: product.image, count: a.items_count })
    end
    products
  end
end