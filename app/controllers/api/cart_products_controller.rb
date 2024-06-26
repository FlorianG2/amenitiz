class Api::CartProductsController < ApplicationController
  def index
  end

  def create
    id = (params[:product_id]).to_i
    product = Product.find(id)
    cart_product = CartProduct.find_by(product_id: id)
    if cart_product
      # If a CartProduct already exists for the product, update its quantity and price
      cart_product.update(quantity: cart_product.quantity + 1, price: cart_product.price + product.price, discount: 0)
    else
      # If a CartProduct doesn't exist, create a new one
      cart_product = CartProduct.new(name: product.name, price: product.price, quantity: 1, product_id: id)
      cart_product.save
    end
  end

  def update_quantity
    cart_product = CartProduct.find(params[:id])
    if cart_product.quantity >= 2
    new_quantity = cart_product.quantity - 1
    price = cart_product.price / cart_product.quantity
    new_price = price * new_quantity
    cart_product.update(quantity: new_quantity, price: new_price)
    else
      cart_product.destroy
    end
  end

  def destroy
    cart_product = CartProduct.find(params[:id])
    cart_product.destroy
  end

  def destroy_all
    CartProduct.destroy_all
  end

  private
  def cart_product_params
    params.permit(:product_id, :price, :name)
  end
end
