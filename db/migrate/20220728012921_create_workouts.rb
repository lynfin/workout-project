class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.date :date
      t.text :comments
      t.integer :user_id
      t.integer :routine_id

      t.timestamps
    end
  end
end
