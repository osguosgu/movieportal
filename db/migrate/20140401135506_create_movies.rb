class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year
      t.string :poster_image
      t.string :backdrop_image
      t.integer :imdb_id
      t.integer :tmdb_id

      t.timestamps
    end
  end
end
