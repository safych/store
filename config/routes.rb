# frozen_string_literal: true

Rails.application.routes.draw do
  resources :orders
  resources :order_items
  post '/login', to: 'tokens#create'
  post '/logout', to: 'tokens#destroy'
  get '/info', to: 'profiles#info'
  get '/userCarts', to: 'cart_items#show_user_cart'
  post '/editUserCart', to: 'cart_items#edit_user_cart'
  post '/deleteUserCart', to: 'cart_items#delete_user_cart'
  post '/productsByName', to: 'products#product_by_name'
  post '/productsByCategory', to: 'products#product_by_category'
  post '/productsByNameCategory', to: 'products#product_by_name_category'
  post '/editPassword', to: 'users#update_password'
  post '/updateNameSurname', to: 'users#update_name_surname'
  post '/updateNumberPhone', to: 'users#update_number_phone'
  post '/updateEmail', to: 'users#update_email'
  post '/resetPassword', to: 'users#reset_password'
  post '/resetUpdatePassword', to: 'users#reset_update_password'
  get '/userOrders', to: 'orders#user_orders'
  get '/userOrderItems', to: 'order_items#user_order_items'
  get '/waitOrder', to: 'orders#wait_orders'
  get '/doneOrder', to: 'orders#done_orders'
  get '/getProducts', to: 'products#get_products'
  get '/getProductsAdmin', to: 'products#admin_get_products'
  post '/doneOrder', to: 'orders#done_order'
  get '/balance', to: 'admins#balance'
  delete '/deleteOrder', to: 'orders#delete_order'
  get '/infoOrderUser', to: 'orders#info_customer'
  get '/searchUserByPhone', to: 'users#search_user_by_phone'
  get '/searchUserByEmail', to: 'users#search_user_by_email'
  resources :cart_items
  resources :products
  resources :categories_products
  resources :categories
  resources :admins
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
