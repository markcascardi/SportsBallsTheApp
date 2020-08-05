class TeamSerializer

  def initialize(team_obj)
    @team_object = team_obj
  end

  def to_serialized_json
    @team_object.to_json({
      include: {athletes: {except: [:created_at, :updated_at]}},
      except: [:created_at, :updated_at],
      methods: [:to_s]
    })
  end
end
