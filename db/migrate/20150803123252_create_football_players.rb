class CreateFootballPlayers < ActiveRecord::Migration
  def change
    create_table :football_players do |t|
      t.string :name
      t.integer :handSizeInches

      t.timestamps
    end
  end
end
