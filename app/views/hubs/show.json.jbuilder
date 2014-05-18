json.(@hub, :id, :name, :description, :privacy, :created_at)
json.is_member @hub.hub_users.include?(current_user)
json.is_admin @hub.admin_users.include?(current_user)
json.users @hub.hub_users do |hub_user|
    json.id hub_user.user.id
    json.name hub_user.user.name
    json.uid hub_user.user.uid
    json.image hub_user.user.image
    json.is_admin hub_user.is_admin
    json.joined hub_user.created_at
end

#json.userasds(@hub.users, :id, :name, :uid, :image, :is_admin, :created_at)

json.reviews @hub.published_reviews do |review|
  json.(review, :id, :rating, :review, :comments, :created_at, :updated_at)
  json.user(review.user, :id, :uid, :name, :image)
  json.movie do
    json.(review.movie, :id, :title, :year)
    json.image tmdb_poster_md(review.movie.poster_image)
  end
end
