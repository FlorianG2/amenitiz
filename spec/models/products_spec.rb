require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'Validation' do
    it 'is not valid without a code' do
      product = Product.new(code: nil, name: 'Green Tea', price: 3.11)
      expect(product).to_not be_valid
    end

    it 'is not valid without a name' do
      product = Product.new(code: 'GR1', name: nil, price: 3.11)
      expect(product).to_not be_valid
    end

    it 'is not valid without a price' do
      product = Product.new(code: 'GR1', name: 'Green Tea', price: nil)
      expect(product).to_not be_valid
    end

    it 'is valid with code, name and price' do
      product = Product.new(code: 'GR1', name: 'Green Tea', price: 3.11)
      expect(product).to be_valid
    end
  end
end
