# frozen_string_literal: true

class CreateTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :tokens do |t|
      t.belongs_to :user, foreign_key: { to_table: :users, on_delete: :cascade }
      t.string :access_token, null: false
      t.timestamp :expire_at, null: false

      t.timestamps
    end
  end
end
