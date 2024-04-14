class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    @cart_products = CartProduct.all
    @total = total_green_tea + total_strawberries + total_coffee
    @number_items = number_cart_products
    render json: {products: @products, cart_products: @cart_products, total: @total, number_items: @number_items}
  end

  def total_green_tea
    product = Product.find_by(code: 'GR1')
    green_tea = CartProduct.find_by(product_id: product.id)
    if green_tea
      quantity = green_tea.quantity
      if quantity > 2
        quantity_divided = quantity / 2.0
        product.price * quantity_divided.round
      elsif [1, 2].include?(quantity)
        product.price
      else
        0
      end
    else
      0
    end
  end

  def total_strawberries
    product = Product.find_by(code: 'SR1')
    strawberries = CartProduct.find_by(product_id: product.id)
    if strawberries
      quantity = strawberries.quantity
      if quantity > 2
        discount = 0.9
        (product.price * discount) * quantity
      else
        product.price * quantity
      end
    else
      0
    end
  end

  def total_coffee
    product = Product.find_by(code: 'CF1')
    coffee = CartProduct.find_by(product_id: product.id)
    if coffee
      quantity = coffee.quantity
      if quantity > 2
        discount = 2.0 / 3
        ((product.price * discount) * quantity).round(2)
      else
        product.price * quantity
      end
    else
      0
    end
  end

  def number_cart_products
    cart_products = CartProduct.all
    number_items = 0
    cart_products.each do |product|
      number_items += product.quantity
    end
    if number_items > 0
      "#{number_items} #{'item'.pluralize(number_items)}"
    else
    end
  end
end
