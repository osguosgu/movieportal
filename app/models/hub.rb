class Hub < ActiveRecord::Base
  PRIVACY = [PRIVACY_PUBLIC = 0, PRIVACY_CLOSED = 1, PRIVACY_INVITE_ONLY = 2]
  validates :name, :description, :privacy, presence: true
  validates :privacy, inclusion: {in: PRIVACY}

  has_many :hub_users
  has_many :users, through: :hub_users
  has_many :admin_hub_users, :class_name => 'HubUser::Admin'
  has_many :admin_users, :through => :admin_hub_users, :source => :user

  #has_and_belongs_to_many :movies
  has_many :reviews, :through => :users

  has_many :published_reviews, :class_name => 'Review::PublishedReview', :through => :users

end