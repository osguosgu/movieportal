class HubsController < ApplicationController
  before_action :set_hub, only: [:show, :edit, :update, :destroy, :join, :leave]


  # GET /hubs
  # GET /hubs.json
  def index
    @hubs = Hub.all
  end

  # GET /hubs/1
  # GET /hubs/1.json
  def show
    #response.headers['Content-Type'] = 'text/event-stream'
    @hub = Hub.includes(:hub_users, :users, :published_reviews => {:comments => :user}).find(params[:id])
  end

  # GET /hubs/new
  def new
    @hub = Hub.new
  end

  # GET /hubs/1/edit
  def edit
  end

  # POST /hubs
  # POST /hubs.json
  def create
    @hub = Hub.new(hub_params)
    @hub.hub_users << HubUser.new(:user => current_user, :is_admin => true)


    respond_to do |format|
      if @hub.save
        format.html { redirect_to @hub, notice: 'Hub was successfully created.' }
        format.json { render action: 'show', status: :created, location: @hub }
      else
        format.html { render action: 'new' }
        format.json { render json: @hub.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hubs/1
  # PATCH/PUT /hubs/1.json
  def update
    respond_to do |format|
      if @hub.update(hub_params)
        format.html { redirect_to @hub, notice: 'Hub was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @hub.errors, status: :unprocessable_entity }
      end
    end
  end

  def join
    #if @hub.privacy == Hub::PRIVACY_PUBLIC
    #@hub = Hub.find(params[:Id])
    respond_to do |format|
      if @hub.hub_users.exists? :user_id => current_user.id
        format.json { render :json => {:message => "Already a member"} }
      else
        @hub.users << current_user
          if @hub.save
            format.json { render :json => {:message => "Success"} }
          else
            format.json { render json: @hub.errors, status: :unprocessable_entity }
          end
      end
    end

  end

  def leave
    @hub.users.destroy(current_user)
    respond_to do |format|
      format.html { redirect_to hubs_url }
      format.json { head :no_content }
    end
  end

  # DELETE /hubs/1
  # DELETE /hubs/1.json
  def destroy
    @hub.destroy
    respond_to do |format|
      format.html { redirect_to hubs_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hub
      if params[:admins].blank?
        @hub = Hub.find(params[:id])
      else
        @hub = Hub.find(params[:id])
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hub_params
      params.require(:hub).permit(:name, :description, :privacy, :user_id)
    end
end
