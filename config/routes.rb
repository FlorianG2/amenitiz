Rails.application.routes.draw do
  namespace :api do
    get 'products/index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "products#index"
end
