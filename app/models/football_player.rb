class FootballPlayer < ActiveRecord::Base
	validates :name, presence: true
	validates :handSizeInches, presence: true

	validates :name, length: { minimum: 2 }
	validates :name, length: { maximum: 200 }
	validates :name, uniqueness: true
end
