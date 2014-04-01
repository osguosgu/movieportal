class CreateUserMovies < ActiveRecord::Migration
  def change
    create_table :user_movies do |t|
      t.float :rating
      t.text :review
      t.boolean :watchlist
      t.boolean :favourite
      t.references :hub, polymorphic: true, index: true

      t.timestamps
    end
  end
end
