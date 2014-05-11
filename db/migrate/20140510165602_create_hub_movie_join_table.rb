class CreateHubMovieJoinTable < ActiveRecord::Migration
  def self.up
    create_table :hubs_movies, :id => false do |t|
      t.integer :hub_id
      t.integer :movie_id
    end

    add_index :hubs_movies, [:hub_id, :movie_id]
  end

  def self.down
    drop_table :hubs_movies
  end
end

