# DB設計

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|

### Association
- has_many :comments
- has_many :members
- has_many :groups, through: :members

### インデックス
add_index :users, [:name]

## commentテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|オプションなし|
|image|string|同上|
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

### インデックス
add_index :comments, [:body, :image]

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :comments
- has_many :users, through: :members

## memberテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
