class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  has_and_belongs_to_many :hubs

  validates :rating, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 10 }
end