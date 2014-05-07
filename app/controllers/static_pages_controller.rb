class StaticPagesController < ApplicationController
  def index
  end
  def app
    gon.current_user = { id: current_user.id }
  end
end
