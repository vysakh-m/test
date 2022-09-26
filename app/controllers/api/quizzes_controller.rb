# frozen_string_literal: true

class Api::QuizzesController < ApplicationController
  after_action :verify_policy_scoped, only: :index
  after_action :verify_authorized, except: :index
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show update destroy]
  before_action :publish_quiz, only: %i[update]

  def index
    @quizzes = policy_scope(Quiz.all)
    render status: :ok, json: { quizzes: @quizzes }
  end

  def create
    @quiz = @current_user.quizzes.new(quiz_params)
    authorize @quiz
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.success", entity: "created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    authorize @quiz
  end

  def update
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.success", entity: "updated") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.success", entity: "deleted") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :publish)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def publish_quiz
      if quiz_params[:publish]
        @quiz.set_slug
        if @quiz.save
          render status: :ok, json: { notice: t("quiz.success", entity: "published") }
        else
          render status: :unprocessable_entity,
            json: { error: @quiz.errors.full_messages.to_sentence }
        end
      end
    end
end
