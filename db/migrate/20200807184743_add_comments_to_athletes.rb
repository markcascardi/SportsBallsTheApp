class AddCommentsToAthletes < ActiveRecord::Migration[6.0]
  def change
    add_column :athletes, :comments, :string
  end
end
