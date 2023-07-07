# frozen_string_literal: true

class CategoriesProductsController < ApplicationController
  before_action :set_categories_product, only: %i[show update destroy]
  before_action :authenticate_admin!

  def index
    render json: CategoriesProduct.all
  end

  def show
    render json: @categories_product
  end

  def update
    if @categories_product.update(categories_product_params)
      render json: @categories_product
    else
      render json: @categories_product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    categories_product = CategoriesProduct.find_by(product_id: request.headers['Product-ID'])
    categories_product.destroy
  end

  private

  def set_categories_product
    @categories_product = CategoriesProduct.find(params[:id])
  end

  def categories_product_params
    params.require(:categories_product).permit(:product_id, :category_id)
  end
end
