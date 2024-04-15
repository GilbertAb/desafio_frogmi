class Feature < ApplicationRecord
    # Association with Comment
    has_many :comments, dependent: :destroy
    # Validations
    validates :external_id, presence: true, uniqueness: true
    validates :title, presence: true
    validates :url, presence: true
    validates :place, presence: true
    validates :mag_type, presence: true
    validates :longitude, presence: true, numericality: {greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0}
    validates :latitude, presence: true, numericality: {greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0}
    validates :mag, numericality: {greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0}
    validates :tsunami, inclusion: { in: [true, false] }
end
