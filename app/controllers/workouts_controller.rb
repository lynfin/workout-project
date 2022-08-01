class WorkoutsController < ApplicationController
  def index
    render json: Workout.all
  end

  def create
    workout = @current_user.workouts.create!(workout_params)
    render json: workout, status: :created
  end

  private

  def workout_params
    params.permit(:date, :comments, :routine_id, :user_id)
  end
end
