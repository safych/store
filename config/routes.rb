# frozen_string_literal: true

Rails.application.routes.draw do
  post '/login', to: 'tokens#create'
  delete '/logout', to: 'tokens#destroy'
  get '/login', to: 'profiles#info'
  resources :cart_items
  resources :products
  resources :categories_products
  resources :categories
  resources :admins
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
