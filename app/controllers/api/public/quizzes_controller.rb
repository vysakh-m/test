# frozen_string_literal: true

class Api::Public::QuizzesController < ApplicationController
  def show
    @quiz = Quiz.find_by(slug: params[:slug])
    unless @quiz
      render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
    end
  end
end
