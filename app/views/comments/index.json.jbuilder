json.array!(@comments) do |comment|
  json.extract! comment, :id, :text, :user_id, :user_movie_id
  json.url comment_url(comment, format: :json)
end
