class User < ActiveRecord::Base
  has_many :hub_users
  has_many :hubs, through: :hub_users
  has_many :admin_hub_users, :class_name => 'HubUser::Admin'
  has_many :administrated_hubs, :through => :admin_hub_users, :source => :hub
  has_many :reviews
  has_many :movies, :through => :reviews

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.image = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end


