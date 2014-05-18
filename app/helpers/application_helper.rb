module ApplicationHelper
  def tmdb_poster_sm(partial)
    "#{$tmdb.base_url}w92#{partial}"
  end

  def tmdb_poster_md(partial)
    "#{$tmdb.base_url}w185#{partial}"
  end

  def tmdb_backdrop(partial)
    "#{$tmdb.base_url}w1280#{partial}"
  end
end
