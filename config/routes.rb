Rails.application.routes.draw do
  namespace :api do
    get 'cart_products/index'
    get 'cart_products/create'
    get 'products/index'
    resources :cart_products do
      delete 'destroy_all', on: :collection
      get 'update_quantity', on: :member
    end
  end
end
