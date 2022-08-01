class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :date, :comments
  belongs_to :user
  belongs_to :routine
end
