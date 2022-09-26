# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by(email: login_params[:email].downcase)
    unless @user.present? && @user.authenticate(login_params[:password]) && @user.role == "administrator"
      render status: :unauthorized, json: { error: t("session.incorrect_credentials") }
    end
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
