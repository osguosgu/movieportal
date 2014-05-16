class Movie < ActiveRecord::Base
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :hubs
  has_many :reviews

  def self.create_from_tmdb_id(id)
    movie = TMDb::Movie.find(id)
    if movie != nil
      Movie.create!(
          :tmdb_id => movie.id,
          :imdb_id => movie.imdb_id,
          :title => movie.title,
          :year => movie.release_date[0,4],
          :poster_image => movie.poster_path,
          :backdrop_image => movie.backdrop_path)
    end
  end
end
