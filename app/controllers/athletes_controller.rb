class AthletesController < ApplicationController
  def index
    athletes = Athlete.all
    render json: AthleteSerializer.new(athletes).to_serialized_json
  end

  def show
    athlete = Athlete.find(params[:id])
    render json: AthleteSerializer.new(athlete).to_serialized_json
  end

  def update
    athlete = Athlete.find(params[:id])
    athlete.update(athlete_params)
    render json: AthleteSerializer.new(athlete).to_serialized_json
  end

  private

  def athlete_params
    params.require(:athlete).permit(:team_id, :firstname, :lastname, :birthdate,
                   :number, :year, :height, :weight, :city, :state, :high_school,
                   :ig_handle, :biography, :image_url)
  end
end
