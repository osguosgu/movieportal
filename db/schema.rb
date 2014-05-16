# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140513202058) do

  create_table "comments", force: true do |t|
    t.text     "text"
    t.integer  "user_id"
    t.integer  "user_movie_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id"
  add_index "comments", ["user_movie_id"], name: "index_comments_on_user_movie_id"

  create_table "genres", force: true do |t|
    t.string "name"
  end

  create_table "hub_users", force: true do |t|
    t.integer  "user_id"
    t.integer  "hub_id"
    t.boolean  "is_admin",   default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hub_users", ["hub_id"], name: "index_hub_users_on_hub_id"
  add_index "hub_users", ["user_id"], name: "index_hub_users_on_user_id"

  create_table "hubs", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "privacy"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hubs_movies", id: false, force: true do |t|
    t.integer "hub_id"
    t.integer "movie_id"
  end

  add_index "hubs_movies", ["hub_id", "movie_id"], name: "index_hubs_movies_on_hub_id_and_movie_id"

  create_table "movies", force: true do |t|
    t.string   "title"
    t.integer  "year"
    t.string   "poster_image"
    t.string   "backdrop_image"
    t.integer  "imdb_id"
    t.integer  "tmdb_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "movies_genres", id: false, force: true do |t|
    t.integer "movie_id"
    t.integer "genre_id"
  end

  add_index "movies_genres", ["movie_id", "genre_id"], name: "index_movies_genres_on_movie_id_and_genre_id"

  create_table "reviews", force: true do |t|
    t.float    "rating"
    t.text     "review"
    t.boolean  "watchlist"
    t.boolean  "favourite"
    t.integer  "user_id"
    t.integer  "movie_id"
    t.boolean  "public",     default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["movie_id"], name: "index_reviews_on_movie_id"
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id"

  create_table "user_movies_hubs", id: false, force: true do |t|
    t.integer "user_movie_id"
    t.integer "hub_id"
  end

  add_index "user_movies_hubs", ["user_movie_id", "hub_id"], name: "index_user_movies_hubs_on_user_movie_id_and_hub_id"

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "username"
    t.string   "image"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
