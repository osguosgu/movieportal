json.array!(@reviews) do |review|
  json.extract! review, :id, :rating, :review, :movie
  if review.user == current_user
    json.watchlist review.watchlist
    json.favourite review.favourite
  end
end
