class WorkoutsController < ApplicationController
  def index
    render json: Workout.all
  end

  def show
    workout = Workout.find(params[:id])
    render json: workout
  end

  
  def create
    workout = @current_user.workouts.create!(workout_params)
    render json: workout, status: :created
  end

  def update
    workout = Workout.find(params[:id])
    workout.update!(workout_params)
    render json: workout, status: :accepted
  end

  def destroy
    workout = Workout.find(params[:id])
    workout.destroy
    head :no_content
  end

  private

  def workout_params
    params.permit(:date, :comments, :routine_id, :user_id)
  end
end
