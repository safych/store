class UserCartsListQuery
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def list
    products = []
    cart_items = CartItem.where(user_id: @user)
    cart_items.map do |a|
      product = Product.find(a.product_id)
      products.push({ id: a.id, name: product.name, size: product.size, price: product.price,
                      image: product.image, count: a.items_count, product: product.id })
    end
    products
  end
end