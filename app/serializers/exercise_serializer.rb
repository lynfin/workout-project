class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :description, :target_area, :equipment, :routine_id
end
