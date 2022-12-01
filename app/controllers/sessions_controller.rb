class SessionsController < ApplicationController

  def create
    user = User.find_by(email: params['user']['email'])
      .try(:authenticate, params['user']['password'])
    # bcrypt's authenticate returns the user or false

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: :unauthorized}
    end
  end
end