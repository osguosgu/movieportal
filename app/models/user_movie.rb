class UserMovie < ActiveRecord::Base
  belongs_to :hub, polymorphic: true
end
