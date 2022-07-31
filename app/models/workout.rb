class Workout < ApplicationRecord
  validates :title, presence: true
  validates :instructions, presence: true, length: { minimum: 50 }
  
  belongs_to :user
  belongs_to :routine
end
