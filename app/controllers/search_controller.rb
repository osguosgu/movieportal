class SearchController < ApplicationController
  def index
    logger.debug 'beginning tmdb req'
    case params[:type]
      when 'movies' then @results = TMDb::Movie.search(params[:query])
      when 'popular' then @results = Tmdb::Movie.popular
      when 'top' then @results = Tmdb::Movie.top_rated
      when 'upcoming' then @results = TMDb::Movie.upcoming
      else @results = TMDb::Movie.search(params[:query], search_type: 'ngram').sort_by { |h| -h.popularity }
    end

  @base = $tmdb.base_url
  #logger.debug "ending tmdb req, rendering"
    #logger.debug @results.to_yaml
    #@results[0].each {|key, value| logger.debug "Key #{key.inspect} has value #{value.inspect}"}
    #logger.debug @results[0].class
    #render json: @results
  #logger.debug @results[0].class
    #Oj.dump(@results)
  end
end