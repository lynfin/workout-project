class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_data

  private

  def handle_invalid_data(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
  end
end
