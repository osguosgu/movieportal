class RenameUserMovieToReview < ActiveRecord::Migration
  def change
    rename_table :user_movies, :reviews
  end
end
