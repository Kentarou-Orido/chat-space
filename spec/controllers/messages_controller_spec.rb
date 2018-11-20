require 'rails_helper'
  describe MessagesController do
    let(:group) { create(:group)}
    let(:user) { create(:user)}

  describe '#index' do

  context 'ログインしている場合' do
    before do
      login user
      get :index, params: { group_id: group.id}
    end
      it '@messageが呼べているか' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it '@groupが呼べているか' do
        expect(assigns(:group)).to eq group
      end
      it '該当するビューは描画されるか' do
        expect(response).to render_template :index
      end
  end
    context 'ログインしていない場合' do
      before do
        get :index, params: { group_id: group.id }
      end
        it '意図したビューにリダイレクされるか' do
          expect(response).to redirect_to(new_user_session_path)
        end
    end
  end

  describe '#create' do
    let(:params) {{ group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

    context 'ログインしてかつ、保存に成功した場合' do
      before do
        login user
      end
      subject {
            post :create,
            params: params
      }
        it 'メッセージの保存ができているか' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        it '意図した画面は描画されているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
    end

    context 'ログインしてかつ、保存に失敗した場合' do
      before do
        login user
      end
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

      it 'メッセージの保存が行われなかったか' do
        expect{ subject }.not_to change(Message, :count)
      end
      it '意図した画面は描画されているか' do
        subject
        expect(response).to render_template :index
      end
    end

    context 'ログインしてない場合' do
      it '意図した画面にリダイレクトしているか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  end
