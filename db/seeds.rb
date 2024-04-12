require 'json'

seed_resource_dir = "#{__dir__}/seed_resources/"

puts 'Cleaning Database...'
CartProduct.destroy_all
Product.destroy_all
puts 'Cleaned Database'
puts '---------------------------'

puts 'Creating products...'
products_json = JSON.parse(File.read("#{seed_resource_dir}/products.json"))
products_json['products'].each do |product|
  attributes = {
    code: product['code'],
    name: product['name'],
    price: product['price'],
  }
  Product.create!(attributes)
end
puts "Created #{Product.count} products"
puts '---------------------------'
