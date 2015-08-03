require 'test_helper'

class FootballPlayersControllerTest < ActionController::TestCase
  setup do
    @football_player = football_players(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:football_players)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create football_player" do
    assert_difference('FootballPlayer.count') do
      post :create, football_player: { handSizeInches: @football_player.handSizeInches, name: @football_player.name }
    end

    assert_redirected_to football_player_path(assigns(:football_player))
  end

  test "should show football_player" do
    get :show, id: @football_player
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @football_player
    assert_response :success
  end

  test "should update football_player" do
    patch :update, id: @football_player, football_player: { handSizeInches: @football_player.handSizeInches, name: @football_player.name }
    assert_redirected_to football_player_path(assigns(:football_player))
  end

  test "should destroy football_player" do
    assert_difference('FootballPlayer.count', -1) do
      delete :destroy, id: @football_player
    end

    assert_redirected_to football_players_path
  end
end
