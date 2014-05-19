json.array!(@results) do |result|

  json.(result, :id, :title, :release_date, :vote_average, :vote_count, :genres, :tagline)
  if !result.poster_path.blank?
    json.poster "#{@base}w185#{result.poster_path}"
  end
end
logger.debug "json done"
