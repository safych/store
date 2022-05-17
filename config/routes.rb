Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  resources :cart_items
  resources :products
  resources :categories_products
  resources :categories
  resources :admins
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
