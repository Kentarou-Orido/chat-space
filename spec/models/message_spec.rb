require 'rails_helper'
describe Message do

  describe '#create' do

    context 'メッセージが保存できる場合' do
      it 'メッセージがあれば保存できる' do
        expect(build(:message, image: nil)).to be_valid
      end
      it '画像があれば保存できる' do
        expect(build(:message, body: nil)).to be_valid
      end
      it '画像とメッセージがあれば保存できる' do
        expect(build(:message)).to be_valid
      end
    end

    context 'メッセージが保存できない場合' do
      it 'メッセージも画像もない' do
        message = build(:message, image: nil, body: nil)
        message.valid?
        expect(message.errors[:body]).to include('を入力してください')
      end
      it 'group_idがない' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
      it 'user_idがない' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end

  end

end
