class Product < ApplicationRecord
   # validations
   validates :code, :name, :price, presence: true
end
