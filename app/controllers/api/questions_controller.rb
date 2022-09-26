# frozen_string_literal: true

class Api::QuestionsController < ApplicationController
  after_action :verify_authorized
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: :create
  before_action :load_question, only: %i[update destroy]

  def create
    @question = @quiz.questions.new(question_params)
    authorize @question
    if @question.save
      render status: :ok, json: { notice: t("question.success", entity: "created") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def update
    authorize @question
    if @question.update(question_params)
      render status: :ok, json: { notice: t("question.success", entity: "updated") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @question
    if @question.destroy
      render status: :ok, json: { notice: t("question.success", entity: "deleted") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find(question_params[:quiz_id])
    end

    def load_question
      @question = Question.find(params[:id])
    end

    def question_params
      params.require(:question).permit(:title, :quiz_id, options_attributes: [:value, :is_answer, :id, :_destroy])
    end
end
