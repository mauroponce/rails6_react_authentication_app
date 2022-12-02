Rails.application.routes.draw do
  resources :sessions, only: [:create] do
    collection do
      get :logged_in
      delete :logout
    end
  end
  resources :registrations, only: [:create]
end
