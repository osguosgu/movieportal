class HubUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :hub
end
