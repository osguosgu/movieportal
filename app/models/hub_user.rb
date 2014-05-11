class HubUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :hub

  class Admin < HubUser
    default_scope lambda { where(:is_admin => true ) }
  end
end
