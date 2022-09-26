# frozen_string_literal: true

class Api::ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @attempt = Attempt.where(submitted: true, quiz_id: @current_user.quizzes.pluck(:id))
  end

  def export
    job_id = ExportReportWorker.perform_async(@current_user.id)
    render json: {
      jid: job_id
    }
  end

  def export_status
    job_status = Sidekiq::Status.get_all(params[:id]).symbolize_keys
    render json: {
      status: job_status[:status],
      percentage: job_status[:pct_complete]
    }
  end

  def export_download
    exported_file_name = "attempts_export_#{params[:id]}.xlsx"
    filename = "ReportData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}"
    send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
  end
end
