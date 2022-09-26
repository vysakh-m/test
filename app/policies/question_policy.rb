# frozen_string_literal: true

class QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
    @user = user
    @question = question
  end

  def create?
    question.quiz.user_id == user.id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
