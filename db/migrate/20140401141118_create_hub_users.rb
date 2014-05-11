class CreateHubUsers < ActiveRecord::Migration
  def change
    create_table :hub_users do |t|
      t.references :user, index: true
      t.references :hub, index: true
      t.boolean :is_admin, null: false, default: false

      t.timestamps
    end
  end
end
