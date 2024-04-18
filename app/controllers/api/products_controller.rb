class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    @cart_products = CartProduct.all.order(:id)
    @total = total_green_tea + total_strawberries + total_coffee
    @total_discount = discount_coffee + discount_strawberries + discount_green_tea
    @subtotal = subtotal
    @number_items = number_cart_products
    render json: {
      products: @products,
      cart_products: @cart_products,
      total: @total,
      number_items: @number_items,
      total_discount: @total_discount,
      subtotal: @subtotal
    }
  end

  def total_green_tea
    product = Product.find_by(code: 'GR1')
    green_tea = CartProduct.find_by(product_id: product.id)
    if green_tea
      quantity = green_tea.quantity
      if quantity > 2
        quantity_divided = quantity / 2.0
        product.price * quantity_divided.round
      else
        product.price
      end
    else
      0
    end
  end

  def discount_green_tea
    product = Product.find_by(code: 'GR1')
    green_tea = CartProduct.find_by(product_id: product.id)
    if green_tea
      discount = (product.price * green_tea.quantity) - total_green_tea
      green_tea.update(discount: discount)
      discount
    else
      0
    end
  end

  def discount_strawberries
    product = Product.find_by(code: 'SR1')
    strawberries = CartProduct.find_by(product_id: product.id)
    if strawberries
      discount = (product.price * strawberries.quantity) - total_strawberries
      strawberries.update(discount: discount)
      discount
    else
      0
    end
  end

  def discount_coffee
    product = Product.find_by(code: 'CF1')
    coffee = CartProduct.find_by(product_id: product.id)
    if coffee
      discount = (product.price * coffee.quantity) - total_coffee
      coffee.update(discount: discount)
      discount
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

  def subtotal
    cart_products = CartProduct.all
    subtotal = 0
    cart_products.each do |product|
      subtotal += product.price
    end
    subtotal
  end
end
