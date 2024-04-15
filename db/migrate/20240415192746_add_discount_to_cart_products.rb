class AddDiscountToCartProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_products, :discount, :decimal, precision: 5, scale: 2
  end
end
