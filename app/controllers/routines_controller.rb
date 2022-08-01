class RoutinesController < ApplicationController
  before_action :find_routine, only: [:show]
  skip_before_action :authorize

  def index
    render json: Routine.all
  end

  def show
    render json: @routine, serializer: RoutineWithExercisesSerializer, status: :ok
  end

  private

  def find_routine
    @routine = Routine.find(params[:id])
  end
end
