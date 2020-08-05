class Season < ApplicationRecord
  has_many :teams

  def to_s
    name
  end
end
