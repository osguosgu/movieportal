class SearchController < ApplicationController
  def index
    @results = case params[:type]
                 #.sort_by &:popularity
      when 'movies' then TMDb::Movie.search(params[:query])
                 when 'popular' then TMDb::Movie.popular
                 when 'top' then TMDb::Movie.top_rated
                 when 'upcoming' then TMDb::Movie.upcoming
                 else TMDb::Movie.search(params[:query], search_type: 'ngram').sort_by { |h| -h.popularity }

               end
    #logger.debug @results.to_yaml
    #@results[0].each {|key, value| logger.debug "Key #{key.inspect} has value #{value.inspect}"}
    #logger.debug @results[0].class
    #render json: @results, :only => [:id, :title, :release_date, :tagline, :vote_average, :vote_count, :genres]
  end
end