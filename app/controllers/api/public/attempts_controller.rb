# frozen_string_literal: true

class Api::Public::AttemptsController < ApplicationController
  before_action :load_data

  def update
    if @attempt.update(attempt_params.merge(calculate_answer_count()))
      render status: :ok, json: { notice: t("quiz.success", entity: "submitted") }
    else
      render status: :unprocessable_entity,
        json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(:submitted, attempt_answers_attributes: [:question_id, :attempt_id, :answer])
    end

    def load_data
      @attempt = Attempt.find(params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end

    def calculate_answer_count
      actual_answers = Option.where(question_id: @attempt.quiz.questions.pluck(:id), is_answer: true).pluck(
        :question_id,
        :value)
      user_answers = attempt_params[:attempt_answers_attributes].map { |attempt|
        [attempt[:question_id].to_i, attempt[:answer]]
      }
      overlapping_answers = actual_answers & user_answers
      {
        correct_answers_count: overlapping_answers.count,
        incorrect_answers_count: (actual_answers.count - overlapping_answers.count)
      }
    end
end
