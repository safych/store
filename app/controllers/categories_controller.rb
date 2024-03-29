# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: %i[show update destroy]
  before_action :authenticate_admin!
  skip_before_action :authenticate_admin!, only: %i[index]

  def index
    render json: Categorie.all
  end

  def show
    render json: @category
  end

  def create
    @category = Categorie.new(category_params)

    if @category.save
      render json: @category, status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
  end

  private

  def set_category
    @category = Categorie.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
