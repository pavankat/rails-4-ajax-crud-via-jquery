class FootballPlayersController < ApplicationController
  before_action :set_football_player, only: [:show, :edit, :update, :destroy]

  # GET /football_players
  # GET /football_players.json
  def index
    @football_players = FootballPlayer.all
  end

  # GET /football_players/1
  # GET /football_players/1.json
  def show
  end

  # GET /football_players/new
  def new
    @football_player = FootballPlayer.new
  end

  # GET /football_players/1/edit
  def edit
  end

  # POST /football_players
  # POST /football_players.json
  def create
    @football_player = FootballPlayer.new(football_player_params)

    respond_to do |format|
      if @football_player.save
        format.html { redirect_to @football_player, notice: 'Football player was successfully created.' }
        format.json { render :show, status: :created, location: @football_player }
      else
        format.html { render :new }
        format.json { render json: @football_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /football_players/1
  # PATCH/PUT /football_players/1.json
  def update
    respond_to do |format|
      if @football_player.update(football_player_params)
        format.html { redirect_to @football_player, notice: 'Football player was successfully updated.' }
        format.json { render :show, status: :ok, location: @football_player }
      else
        format.html { render :edit }
        format.json { render json: @football_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /football_players/1
  # DELETE /football_players/1.json
  def destroy
    @football_player.destroy
    respond_to do |format|
      format.html { redirect_to football_players_url, notice: 'Football player was successfully destroyed.' }
      format.json { head :no_content }
    end
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
