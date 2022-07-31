class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :image_url
      t.string :description
      t.string :target_area
      t.string :equipment
      t.integer :routine_id

      t.timestamps
    end
  end
end
