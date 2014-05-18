json.array!(@movies) do |movie|
  json.extract! movie, :id, :title, :year, :imdb_id, :tmdb_id
  if movie.poster_image
    json.image tmdb_poster_md(movie.poster_image)
  end

  if movie.backdrop_image
   json.backdrop tmdb_backdrop(movie.backdrop_image)
  end

  json.watchlist movie.reviews.first.watchlist
  json.favourite movie.reviews.first.favourite


=begin
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
=end
end
