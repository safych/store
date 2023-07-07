# frozen_string_literal: true

class ProductsController < ApplicationController
  before_action :check_token!
  skip_before_action :check_token!, only: %i[index]
  before_action :set_order, only: %i[show update destroy]
  before_action :authenticate_user!, only: %i[get_products]
  before_action :authenticate_admin!
  skip_before_action :authenticate_admin!, only: %i[get_products index]

  def get_products
    render json: ProductsListQuery.new(request.headers['Order-ID']).list
  end

  def admin_get_products
    render json: ProductsListQuery.new(request.headers['Order-ID']).list
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end

    product_last = Product.last
    categories_product = CategoriesProduct.new(product_id: product_last.id, category_id: request.headers['Category'])
    categories_product.save
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
  end

  def index
    render json: Product.all
  end

  def product_by_name
    products = Product.where(name: params[:name])
    render json: products
  end

  def product_by_category
    products = []
    category_products = CategoriesProduct.where(category_id: params[:category])
    category_products.map do |a|
      product = Product.find(a.product_id)
      products.push(product)
    end
    render json: products
  end

  def product_by_name_category
    products = []
    category_products = CategoriesProduct.where(category_id: params[:category])
    category_products.map do |a|
      product = Product.find(a.product_id)
      products.push(product) if product.name == params[:name]
    end
    render json: products
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :size, :items_left, :price, :image)
  end
end
