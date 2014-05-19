json.extract! @movie, :id, :title, :tmdb_id, :imdb_id, :year, :created_at, :updated_at
if @movie.poster_image
    json.img "#{$tmdb.base_url}w185#{@movie.poster_image}"
end
if @movie.backdrop_image
    json.backdrop "#{$tmdb.base_url}w1280#{@movie.backdrop_image}"
end
json.reviews @movie.published_reviews do |review|
  json.user_id review.user.id
  json.user_uid review.user.uid
  json.user review.user.name
  json.rating review.rating
  json.text review.review
  json.date review.updated_at
  json.comments review.comments do |c|
    json.(c, :text, :created_at)
    json.user(c.user, :id, :uid, :name)
  end
end

if @meta != nil
  json.watchlist @meta.watchlist
  json.favourite @meta.favourite
end

json.tmdb @tmdb
json.trailers @trailers
