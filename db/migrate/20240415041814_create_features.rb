class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features, id: false, primary_key: :id do |t|
      t.string :id
      t.float :mag
      t.string :place
      t.bigint :time
      t.string :url
      t.boolean :tsunami
      t.string :mag_type
      t.string :title
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
