class TeamsController < ApplicationController
  def index
    teams = Team.where(id: 661)
    render json: TeamSerializer.new(teams).to_serialized_json
  end

  def show
    team = Team.find(params[:id])
    render json: TeamSerializer.new(team).to_serialized_json
  end

  def update
    team = Team.find(params[:id])
    team.update(team_params)
    render json: TeamSerializer.new(team).to_serialized_json
  end

  private

  def team_params
    params.require(:team).permit(:sport_id, :season_id)
  end
end
