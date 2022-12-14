class SessionsController < ApplicationController
  include CurrentUser

  before_action :set_current_user, only: [:logged_in, :logout]
 
  def create
    user = User.find_by(email: params['user']['email'])
      .try(:authenticate, params['user']['password'])
    # bcrypt's authenticate returns the user or false

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: :unauthorized }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {
      status: 200
    }
  end
end