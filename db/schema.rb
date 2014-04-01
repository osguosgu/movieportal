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

ActiveRecord::Schema.define(version: 20140401143403) do

  create_table "hub_users", force: true do |t|
    t.integer  "user_id"
    t.integer  "hub_id"
    t.boolean  "is_admin"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hub_users", ["hub_id"], name: "index_hub_users_on_hub_id"
  add_index "hub_users", ["user_id"], name: "index_hub_users_on_user_id"

  create_table "hubs", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hubs", ["user_id"], name: "index_hubs_on_user_id"

  create_table "movies", force: true do |t|
    t.string   "title"
    t.integer  "year"
    t.integer  "imdb_id"
    t.integer  "tmdb_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_movies", force: true do |t|
    t.float    "rating"
    t.text     "review"
    t.boolean  "watchlist"
    t.boolean  "favourite"
    t.integer  "hub_id"
    t.string   "hub_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_movies", ["hub_id", "hub_type"], name: "index_user_movies_on_hub_id_and_hub_type"

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "password"
    t.string   "realname"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
