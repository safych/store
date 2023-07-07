class CartItemCreateService
  def initialize(email, password, user)
    @product = user
    @count = products
    @user = user
  end

  def create
    product = Product.find(@product)
    if product.items_left >= @count.to_i
      cart_item = CartItem.new(user_id: @user, product_id: @product, items_count: @count)
      cart_item.save
    end
  end
end