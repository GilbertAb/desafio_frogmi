class RenameIdColumnInFeatures < ActiveRecord::Migration[7.1]
  def change
    rename_column :features, :id, :external_id
  end
end
