class HubsController < ApplicationController
  before_action :set_hub, only: [:show, :edit, :update, :destroy]

  # GET /hubs
  # GET /hubs.json
  def index
    @hubs = Hub.all
  end

  # GET /hubs/1
  # GET /hubs/1.json
  def show
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
    if @hub.save
      hubUser = HubUser.new(:user => current_user, :hub => @hub, :is_admin => true)
      ok = hubUser.save
    else
      ok = false
    end

    respond_to do |format|
      if ok
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
    if @hub.privacy == Hub::PRIVACY_PUBLIC
      @hub.users << current_user
      render.json { @hub }
    end

    render.json { head :no_content }
  end

  def leave
    @hub.users.destroy(current_user)
    render.json { head :no_content }
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
