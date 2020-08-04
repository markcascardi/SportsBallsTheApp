class AthleteSerializer

  def initialize(athlete_obj)
    @ao = athlete_obj
  end

  def to_serialized_json
    @ao.to_json({
      except: [:created_at, :updated_at]
    })
  end
end
