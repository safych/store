class User < ApplicationRecord
    has_many :cart_items
end
