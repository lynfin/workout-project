class RoutinesController < ApplicationController
    def index
        render json: Routine.all
    end
end
