class CreateHubUsers < ActiveRecord::Migration
  def change
    create_table :hub_users do |t|
      t.references :user, index: true
      t.references :hub, index: true
      t.boolean :is_admin

      t.timestamps
    end
  end
end
