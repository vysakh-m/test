# frozen_string_literal: true

class Api::Public::UsersController < ApplicationController
  before_action :load_user

  def create
    if @user
      load_attempt()
      create_attempt() unless @attempt
    else
      create_user()
      create_attempt()
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :quiz_id)
    end

    def load_user
      @user = User.find_by(email: user_params[:email].downcase)
    end

    def load_attempt
      @attempt = @user.attempts.find_by(quiz_id: user_params[:quiz_id])
    end

    def create_user
      @user = User.new(user_params.except(:quiz_id).merge(password: "password", password_confirmation: "password"))
      unless @user.save
        render status: :unprocessable_entity,
          json: { error: @user.errors.full_messages.to_sentence }
      end
    end

    def create_attempt
      @attempt = @user.attempts.new(user_id: @user.id, quiz_id: user_params[:quiz_id], submitted: false)
      unless @attempt.save
        render status: :unprocessable_entity,
          json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
end
