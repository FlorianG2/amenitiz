require 'rails_helper'

RSpec.describe "Api::Products", type: :request do
  describe 'Discounts' do
    context 'Green Tea' do
      it 'When buy one green tea get one for free' do
        product = Product.create!(code: 'GR1', name: 'Green Tea', price: 3.11)
        green_tea = CartProduct.create!(product_id: product.id, quantity: 2, price: 3.11)
        actual = Api::ProductsController.new.total_green_tea()
        expected = product.price
        expect(actual).to eq(expected)
      end

      it 'If buy 5 green teas, get the price of 3' do
        product = Product.create!(code: 'GR1', name: 'Green Tea', price: 3.11)
        cart_product = CartProduct.create!(product_id: product.id, quantity: 5)
        actual = Api::ProductsController.new.total_green_tea
        expected = product.price * (cart_product.quantity / 2.0).ceil
        expect(actual).to eq(expected)
      end
    end

    context 'Strawberries' do
      it 'When buy 3 or more the price change into 4.50€' do
        product = Product.create!(code: 'SR1', name: 'Strawberries', price: 5.00)
        cart_product = CartProduct.create!(product_id: product.id, quantity: 5)
        discount = 0.9
        actual = Api::ProductsController.new.total_strawberries
        expected = (product.price * discount) * cart_product.quantity
        expect(actual).to eq(expected)
      end

      it 'When buy 2, the price should be 10€' do
        product = Product.create!(code: 'SR1', name: 'Strawberries', price: 5.00)
        cart_product = CartProduct.create!(product_id: product.id, quantity: 2)
        actual = Api::ProductsController.new.total_strawberries
        expected = product.price * cart_product.quantity
        expect(actual).to eq(expected)
      end
    end

    context 'Coffee' do
      it 'when buy 2, the price should be 22.46€' do
        product = Product.create!(code: 'CF1', name: 'Coffee', price: 11.23)
        cart_product = CartProduct.create!(product_id: product.id, quantity: 2)
        actual = Api::ProductsController.new.total_coffee
        expected = product.price * cart_product.quantity
        expect(actual).to eq(expected)
      end

      it 'when buy 3 or more the price of all coffees drop to 2/3 of the original price' do
        product = Product.create!(code: 'CF1', name: 'Coffee', price: 11.23)
        cart_product = CartProduct.create!(product_id: product.id, quantity: 5)
        discount = 2 / 3.0
        actual = Api::ProductsController.new.total_coffee
        expected = ((product.price * discount) * cart_product.quantity).round(2)
        expect(actual).to eq(expected)
      end
    end
  end
end
