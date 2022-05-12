require "test_helper"

class CategoriesProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @categories_product = categories_products(:one)
  end

  test "should get index" do
    get categories_products_url, as: :json
    assert_response :success
  end

  test "should create categories_product" do
    assert_difference('CategoriesProduct.count') do
      post categories_products_url, params: { categories_product: { category_id: @categories_product.category_id, product_id: @categories_product.product_id } }, as: :json
    end

    assert_response 201
  end

  test "should show categories_product" do
    get categories_product_url(@categories_product), as: :json
    assert_response :success
  end

  test "should update categories_product" do
    patch categories_product_url(@categories_product), params: { categories_product: { category_id: @categories_product.category_id, product_id: @categories_product.product_id } }, as: :json
    assert_response 200
  end

  test "should destroy categories_product" do
    assert_difference('CategoriesProduct.count', -1) do
      delete categories_product_url(@categories_product), as: :json
    end

    assert_response 204
  end
end
