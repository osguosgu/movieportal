class ChangeCommentReferences < ActiveRecord::Migration
  def change
    change_table :comments do |t|
      t.remove :user_movie_id
      t.references :review, index: true
    end
  end
end
