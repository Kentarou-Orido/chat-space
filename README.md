# Chat Space チャット画面の制作

## 概要
- 指定通り、メッセージコントローラーを作り、indexアクションがrootパスになるようルーティング
- コントローラー制作時発生する不要ファイルは、application.rbに不要ファイルを作らないように表記して防いだ
- ビューファイルはapp/views/messages/index.html.hamlに設置
- app/assets/stylesheets以下にscssファイルを設置
- font awesome導入済み

## scssファイルの詳細内容

- _variable.scss
  index.scssファイル内で複数回使うプロパティの値（色とか）を定義
- _mixin.scss
  index.scssファイル内で複数回使うスタイルを定義
- _index.scss
  index.html.hamlのためのscssファイル
- _reset.scss
  リセットcss。指定通り、YUI 3を使用した
- _application.scss
  複数存在するscssを統合するためのscssファイル

## 指摘を受けての変更点

### 前々回指摘分

### index.html.hamlの記述に関する指摘
~~ - [指摘点]a要素とi要素はヘルパーメソッドを使おう ~~
~~ - １５、１７、２０、２３行目のa要素をlink_toメソッドで表記し直した ~~
~~ - [指摘点]%divは省略しよう ~~
~~ - 全ての%divの表記を削除した ~~
~~ - [指摘点]４行目にハッシュロケットを使った記法あり。古い記法だから修正しよう ~~
  ~~ - rubyのハッシュと同じように、シンボルを使った記法に変えた。 ~~

### 前々回指摘分ここまで

###前回指摘分
- [指摘点]htmlとscssはもう少し分けられる
  - index.html.hmlに部分テンプレートを適用し、**right-main.html.haml**と**left-side.html.haml**に分けた
  - index.scssはパーシャル機能を使って、**right-main.scss**と**left-side.scss**と**notification-bar.scss**に分けた
- [指摘点]アイコンはヘルパーメソッドを使って記述して
  - application.scssにfont-swesomeに関する記述を追加し、fa_iconメソッドを使って表記し直した
  - 上記の記述追加に伴い、index.html.hamlのhead部分にあったfont-awesomeに関する記述は削除した

#### notification-bar.scssを作った理由
    - ログイン画面など他のところでも流用できそうだったため。
    - [補足]htmlのクラス命名時、notification-barの後に、bc-cyanをクラスを別に指定すれば、バーの背景色はシアンに
    - [補足]bc-redに指定すると背景色は赤になるようにした

<!-- # DB設計

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
 -->
