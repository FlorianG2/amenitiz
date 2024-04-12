class Api::CartProductsController < ApplicationController
  def index
  end

  def create
    id = (params.keys[0]).to_i
    product = Product.find(id)
    cart_product = CartProduct.find_by(product_id: id)
    if cart_product
      # If a CartProduct already exists for the product, update its quantity and price
      cart_product.update(quantity: cart_product.quantity + 1, price: cart_product.price + product.price)
    else
      # If a CartProduct doesn't exist, create a new one
      cart_product = CartProduct.new(name: product.name, price: product.price, quantity: 1, product_id: id)
      cart_product.save
    end
    redirect_to api_products_index_path
    # if cart_product.save
    #   cart_product = CartProduct.new(name: product.name, price: product.price, quantity: 1)
    #   # cart_product.save
    #   redirect_to api_products_index_path
    #   # render json: cart_product
    # else
    #   # updated_quantity = cart_product.quantity + 1
    #   # updated_price = cart_product.price + product.price
    #   # cart_product = CartProduct.update!(price: updated_price, quantity: updated_quantity)
    #   # render json: cart_product.errors
    #   redirect_to api_products_index_path
    # end
  end

  private
  def cart_product_params
    params.permit(:product_id, :price, :name)
  end
end
