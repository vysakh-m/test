# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(user_id)
    sleep 10
    attempts = User.find(user_id).quizzes.map { |quiz| quiz.attempts.filter { |attempt|
 attempt.submitted } }.flatten
    total attempts.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row ["Quiz Name", "User Name", "Email", "Correct Answers", "Incorrect Answers"]
      attempts.each.with_index(1) do |attempt, idx|
        user_name = "#{attempt.user.first_name} #{attempt.user.last_name}"
        worksheet.add_row [attempt.quiz.title, user_name, attempt.user.email,
          attempt.correct_answers_count, attempt.incorrect_answers_count]
        at idx
      end
    end
    xlsx_package.serialize Rails.root.join("tmp", "attempts_export_#{self.jid}.xlsx")
  end
end
