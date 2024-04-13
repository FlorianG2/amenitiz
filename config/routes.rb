Rails.application.routes.draw do
  get 'homepage/index'
  namespace :api do
    get 'cart_products/index'
    get 'cart_products/create'
    get 'products/index'
    resources :cart_products do
      delete 'destroy_all', on: :collection
      get 'update_quantity', on: :member
    end
  end
  root 'homepage#index'
end
