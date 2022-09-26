# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    defaults format: :json do
        resource :sessions, only: %i[create destroy]
        resources :quizzes, except: %i[new edit]
        resources :questions, only: %i[create update destroy]
        resources :reports, only: %i[index]
        namespace :public do
          resources :quizzes, only: %i[show], param: :slug
          resources :users, only: %i[create]
          resources :attempts, only: %i[show update]
        end
        get "/export" => "reports#export"
        get "/export_status/:id" => "reports#export_status"
      end
    defaults format: :xlsx do
      get "/export_download/:id" => "reports#export_download"
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
