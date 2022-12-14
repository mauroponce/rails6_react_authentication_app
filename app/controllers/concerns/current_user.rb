module CurrentUser
  extend ActiveSupport::Concern

	def set_current_user
		if session[:user_id]
			@current_user = User.find(session[:user_id])
		end
	end
end