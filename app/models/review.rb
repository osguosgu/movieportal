class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie
  has_many :comments
  has_and_belongs_to_many :hubs

  validates_numericality_of :rating, allow_blank: true, greater_than: 0, less_than_or_equal_to: 10

  class PublishedReview < Review
    default_scope lambda { where.not(:rating => nil ) }
  end
end