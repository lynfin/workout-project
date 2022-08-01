class Workout < ApplicationRecord
  validates :date, presence: true
  validates :comments, presence: true
  
  belongs_to :user
  belongs_to :routine
end
