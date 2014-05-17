class MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :edit, :update, :destroy]

  # GET /movies
  # GET /movies.json
  def index

    # LEFT OUTER JOIN movies with current user's review
    @movies = Movie.all.includes(:reviews).where(:reviews => { :user_id => current_user.id } )
  end

  # GET /movies/1
  # GET /movies/1.json
  def show
  end

  # GET /movies/new
  def new
    @movie = Movie.new
  end

  # GET /movies/1/edit
  def edit
  end

  # POST /movies
  # POST /movies.json
  def create

    movie = TMDb::Movie.find(params[:id])
    if movie != nil
      logger.debug "found movie from tmdb: #{movie[:title]}"
      @movie = Movie.new(
          :tmdb_id => movie.id,
          :imdb_id => movie.imdb_id,
          :title => movie.title,
          :year => movie.release_date[0,4],
          :poster_image => movie.poster_path,
          :backdrop_image => movie.backdrop_path)

      respond_to do |format|
        if @movie.save
          format.html { redirect_to @movie, notice: 'Movie was successfully created.' }
          format.json { render action: 'show', status: :created, location: @movie }
        else
          format.html { render action: 'new' }
          format.json { render json: @movie.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /movies/1
  # PATCH/PUT /movies/1.json
  def update
    respond_to do |format|
      if @movie.update(movie_params)
        format.html { redirect_to @movie, notice: 'Movie was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movies/1
  # DELETE /movies/1.json
  def destroy
    @movie.destroy
    respond_to do |format|
      format.html { redirect_to movies_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      @movie = Movie.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def movie_params
      params[:movie]
    end
end
