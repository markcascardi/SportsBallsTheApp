class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.integer :sport_id
      t.integer :season_id

      t.timestamps
    end
  end
end
