class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  has_many :workouts
  has_many :routines, through: :workouts

  has_secure_password
end
