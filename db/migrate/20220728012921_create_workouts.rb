class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.string :title
      t.text :instructions
      t.integer :minutes_to_complete
      t.integer :user_id
      t.integer :routine_id

      t.timestamps
    end
  end
end
