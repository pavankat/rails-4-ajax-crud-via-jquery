class FootballPlayersController < ApplicationController
  before_action :set_football_player, only: [:show, :update, :destroy]

  def index
    render json: FootballPlayer.all
  end

  def show
    render json: @football_player
  end

  def create
    football_player = FootballPlayer.new(football_player_params)

    if football_player.save
      render json: football_player 
    else
      render json: football_player.errors, status: :unprocessable_entity #uses 422 for the status code - http://guides.rubyonrails.org/layouts_and_rendering.html
    end
  end

  def update
    if @football_player.update(football_player_params)
      render json: @football_player
    else
      render json: @football_player.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @football_player.destroy
    render json: @football_player
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_football_player
      @football_player = FootballPlayer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def football_player_params
      params.require(:football_player).permit(:name, :handSizeInches)
    end
end
