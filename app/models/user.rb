class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_many :workouts
  has_secure_password
end
