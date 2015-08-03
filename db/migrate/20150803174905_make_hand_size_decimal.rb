class MakeHandSizeDecimal < ActiveRecord::Migration
  def change
  	remove_column :football_players, :handSizeInches
  	add_column :football_players, :handSizeInches, :decimal

  end
end
