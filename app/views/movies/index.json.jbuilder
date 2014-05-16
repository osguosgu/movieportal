json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :year, :imdb_id, :tmdb_id
  if movie.poster_image
    json.img "#{$tmdb.base_url}w185#{movie.poster_image}"
  end
  if movie.backdrop_image
    json.backdrop "#{$tmdb.base_url}w1280#{movie.backdrop_image}"
  end
  json.reviews movie.reviews do |json, review|
      json.user_id review.user.id
      json.user review.user.name
      json.rating review.rating
      if review.user.id == current_user.id
        json.watchlist review.watchlist
        json.favourite review.favourite
      end
      json.date review.updated_at
  end
end
