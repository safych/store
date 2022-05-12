class CategoriesProductsController < ApplicationController
  before_action :set_categories_product, only: [:show, :update, :destroy]

  # GET /categories_products
  def index
    @categories_products = CategoriesProduct.all

    render json: @categories_products
  end

  # GET /categories_products/1
  def show
    render json: @categories_product
  end

  # POST /categories_products
  def create
    @categories_product = CategoriesProduct.new(categories_product_params)

    if @categories_product.save
      render json: @categories_product, status: :created, location: @categories_product
    else
      render json: @categories_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories_products/1
  def update
    if @categories_product.update(categories_product_params)
      render json: @categories_product
    else
      render json: @categories_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories_products/1
  def destroy
    @categories_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_categories_product
      @categories_product = CategoriesProduct.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def categories_product_params
      params.require(:categories_product).permit(:product_id, :category_id)
    end
end
