class AddAdminIdToTokens < ActiveRecord::Migration[6.1]
  def change
    add_column :tokens, :admin_id, :integer
  end
end
