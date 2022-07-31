class RoutinesController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Routine.all
    end
end
