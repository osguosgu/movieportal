class User < ActiveRecord::Base
  has_many :hubs, through: :hub_users
end
