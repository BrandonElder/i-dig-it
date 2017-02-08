class CreateDiscs < ActiveRecord::Migration
  def change
    create_table :discs do |t|

      t.timestamps
    end
  end
end
