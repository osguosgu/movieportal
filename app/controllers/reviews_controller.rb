class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  protect_from_forgery :except => :metadata

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.joins(:movie).where(:user_id => current_user.id)
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
  end

  # GET /reviews/new
  def new
    @review = Review.new
  end

  # GET /reviews/1/edit
  def edit
  end

  # POST /reviews
  # POST /reviews.json
  def create

    # user may have only one review per movie
    if current_user.movies.exists?(:tmdb_id => params[:movie]["id"])
      render json: { error: 'You already have a review for this movie' }, status: :unprocessable_entity
      return
    end

    # checking if the movie exists in db
    movie = Movie.find_by_tmdb_id(params[:movie]["id"]) || Movie.create_from_tmdb_id(params[:movie]["id"])

    @review = Review.new(:movie_id => movie.id, :user_id => current_user.id, :rating => params[:rating],
                         :review => params[:text], :favourite => params[:favourite], :watchlist => false)

    respond_to do |format|
      if @review.save
        format.html { redirect_to @review, notice: 'Review was successfully created.' }
        format.json { render action: 'show', status: :created, location: @review }
      else
        format.html { render action: 'new' }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /reviews/metadata
  # Update the watchlist/favourite status
  def metadata
    movie = Movie.find_by_tmdb_id(params[:movie_id]) || Movie.create_from_tmdb_id(params[:movie_id])
    @review = Review.find_or_create_by(:user_id => current_user.id, :movie_id => movie.id)
    #@review.watchlist = params[:watchlist]
    if @review.update_attributes(params.permit(:watchlist, :favourite))
      render action: 'show', status: :created, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # POST /reviews/favourite
  def favourite
    movie = Movie.find_by_tmdb_id(params[:movie_id]) || Movie.create_from_tmdb_id(params[:movie_id])
    @review = Review.find_or_create_by(:user_id => current_user.id, :movie_id => movie.id)
    @review.favourite = params[:favourite]
    if @review.save
      render action: 'show', status: :created, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    respond_to do |format|
      if @review.update(review_params)
        format.html { redirect_to @review, notice: 'Review was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @review.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
    respond_to do |format|
      format.html { redirect_to Reviews_url }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = Review.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def review_params
    params.require(:review).permit(:movie, :rating, :text, :favourite, :watchlist)
  end
end