class CreateUserMovies < ActiveRecord::Migration
  def change
    create_table :user_movies do |t|
      t.float :rating
      t.text :review
      t.boolean :watchlist
      t.boolean :favourite
      t.references :user, index: true
      t.references :movie, index: true
      t.boolean :public, null: false, default: false

      t.timestamps
    end
  end
end
