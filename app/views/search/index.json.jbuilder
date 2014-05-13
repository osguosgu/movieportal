json.array!(@results) do |result|
  if result.class == Hash
    result = Tmdb::Movie.new(result)
  end

  json.(result, :id, :title, :release_date, :vote_average, :vote_count, :genres, :tagline)
  #json.(@results, result.keys)
  if !result.poster_path.blank?
    json.poster "#{$tmdb.base_url}w92#{result.poster_path}"
  end
end
