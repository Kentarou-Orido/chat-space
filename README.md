# chat space 自動更新機能の実装

## 概要
- 5秒に一回非同期通信を使い、グループのメッセージの自動更新するようにした
- auto-reload.jsにコメントの自動更新のための非同期通信の記述あり
- auto-reload.jsでcurrent_user.nameの値を使いたかったので、グループチャット画面のビューファイル(right-main.html.haml)にcurrent_user.nameをjsファイルに送るための記述がある

## 自動更新時の内部処理方法

簡単に言えば、**前回更新時のグループのメッセージ総数**と**今回更新時のグループのメッセージ総数**を比較し、その数に相違があれば、新規コメント分のみ出力している。

1. 以下の変数をauto-reload.jsに定義しておく
    1. precount・・・非同期通信成功時に、そのグループのメッセージ総数を入れておく変数
    1. count ・・・非同期通信し、HTML出力後に、グループのメッセージ総数を入れておく変数
    1. current_user_name・・・current_user.nameの値を入れておく為の変数
1. json形式でメッセージの内容（文字列、画像）と、idと、メッセージをかいたユーザー名、作成日時を受け取る
1. auto-reload.jsの４１行目で、前回更新時のグループのメッセージ総数(count変数)と今回更新時のグループのメッセージ総数(precount変数)を比較し、相違があるか否か確認
1. 相違があった場合は新規コメントがあるということなので、forEachを使ってメッセージ内容を取り出す。しかし、その前に
1. 43行目で、既に出力されたメッセージを削除する（受け取ったメッセージの内、count変数の数だけ既出のメッセージがあるので）
1. 45行目で、新規コメント分の内、自分が書いたメッセージは出力しないようにする
1. HTML出力処理後、今回のグループコメント総数をcount変数に代入し、次回更新時に比較できるようにしておく

_この方法ではcount変数の初期値を0にしている関係上、初回更新時にcount変数とprecount変数に相違が必ず生まれてしまう。_

_その為、グループのメッセージのほとんどが出力されてしまうので、auto-reload.jsの４１行目のif分の条件式の最後にcount !== 0と記載し、初回更新時はメッセージが自動更新されないようにしている_


<!-- # chat space ユーザー検索をインクリメンタルサーチ化

## 概要
- ユーザー検索をインクリメンタルサーチ化(gif有り)
- ユーザー検索で部分一致したユーザーを検索BOXの下に表示(gif有り)
- 部分一致したユーザー名の横に**追加**リンクをつけた(gif有り)
- 追加ボタンを押すとチャットメンバーの横にボタンを押されたユーザー名を表示(gif有り)
- チャットメンバーの横に表示されたメンバー名の横に**削除**リンクをつけた(gif有り)
- 削除リンクを押すとチャットメンバーから名前を消す(gif有り)
- 検索したい文字列の前に空白があっても名前が検索されるようにした
 -->
<!-- # chat space メッセージ送信機能の非同期通信化

## 概要
- メッセージ送信を非同期通信で行うようにした
- 非同期通信後、メッセージ画面（参加グループのコメントが出ている画面）の一番したにスクロールするようにした
- チャット画面の左側（参加グループが一覧で出ている画面）にoverflowプロパティを適用
    - 参加グループが多くなっても参加グループのリンクが画面からはみ出ないようにした
- jsonでデータを受け取った時、bodyキー(文字メッセージ本文)内に文字データがあるか否かで、出力するHTMLのデータを選ぶようにしている
- 非同期通信を起こすためのイベントが２回実行されるのを防ぐため、イベントの最後にreturn falseをかいた

 -->
<!-- # Chat Space チャット画面の制作

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


### 前々回指摘分(ここから)
---
### index.html.hamlの記述に関する指摘

- [指摘点]a要素とi要素はヘルパーメソッドを使おう
    - １５、１７、２０、２３行目のa要素をlink_toメソッドで表記し直した
- [指摘点]%divは省略しよう
    - 全ての%divの表記を削除した
- [指摘点]４行目にハッシュロケットを使った記法あり。古い記法だから修正しよう
    - rubyのハッシュと同じように、シンボルを使った記法に変えた。

### 前々回指摘分（ここまで）

###前回指摘分
---
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

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|オプションなし|
|image|string|同上|
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

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
