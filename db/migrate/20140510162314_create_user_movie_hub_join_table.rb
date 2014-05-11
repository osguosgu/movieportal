class CreateUserMovieHubJoinTable < ActiveRecord::Migration
  def self.up
    create_table :user_movies_hubs, :id => false do |t|
      t.integer :user_movie_id
      t.integer :hub_id
    end

    add_index :user_movies_hubs, [:user_movie_id, :hub_id]
  end

  def self.down
    drop_table :user_movies_hubs
  end
end
