class CreateMoviesGenresJoinTable < ActiveRecord::Migration
  def self.up
    create_table :movies_genres, :id => false do |t|
      t.integer :movie_id
      t.integer :genre_id
    end
    add_index :movies_genres, [:movie_id, :genre_id]
  end
  def self.down
    drop_table :movies_genres
  end
end
