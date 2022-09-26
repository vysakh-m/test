# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy, foreign_key: :quiz_id
  has_many :attempts, dependent: :destroy, foreign_key: :quiz_id

  validates :title, presence: true, length: { maximum: 25 }

  before_validation :set_slug, if: -> { slug.present? }

  def set_slug
    title_slug = title.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{title_slug}$|#{title_slug}-[0-9]+$"
    ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
    self.slug = slug_candidate
  end
end
