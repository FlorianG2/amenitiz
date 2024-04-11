class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    @cart_products = CartProduct.all
    # render json: @products
  end
end
