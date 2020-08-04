class TeamSerializer

  def initialize(team_obj)
    @to = team_obj
  end

  def to_serialized_json
    @to.to_json({
      include: {athletes: {except: [:created_at, :updated_at]}},
      except: [:created_at, :updated_at]
    })
  end
end
