class Hub < ActiveRecord::Base
  has_many :users, through: :hub_users
end
