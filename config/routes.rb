Rails.application.routes.draw do
  namespace :api do
    get 'cart_products/index'
    get 'cart_products/create'
    get 'products/index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "products#index"
end
