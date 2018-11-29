$(function() {
  function buildHTML(message){
    if (message.body.match(".+")){
      var html = `<div class= "right-main__chat-main__message">
                    <div class= "right-main__chat-main__message__name">
                      ${message.name}
                    </div>
                    <div class= "right-main__chat-main__message__time">
                      ${message.date}
                    </div>
                    <div class= "right-main__chat-main__message__body">
                      ${message.body}
                    </div>`
      }else{
        var html = `<div class= "right-main__chat-main__message">
                      <div class= "right-main__chat-main__message__name">
                        ${message.name}
                      </div>
                      <div class= "right-main__chat-main__message__time">
                        ${message.date}
                      </div>
                      <div class= "right-main__chat-main__message__body"></div>
                      <img class= "right-main__chat-main__message__image" src= ${message.image.url}>
                    </div>`
      }
    return html;
  }

  var count = 0; // この変数は、HTML出力後に、自動更新時に取得したメッセージ数を入れておく変数
  var precount = 0; //この変数は、非同期通信成功時に、自動更新の際に取得したメッセージ数を入れておく変数
  var current_user_name = $('.current_user_name').val(); // このファイル内でcurrent_user.nameの値を使う為の記述
  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        precount = data.messages.length;
          if (precount !== count && count !== 0){ //ここで、前回更新時のメッセージ数と今回更新時のメッセージ数を比較している
          //count!==0は、初回更新時に４３行目から４７行目が読み込まれるのを防ぐため
            data.messages.splice(0, count); //このように表記することによって、取得したメッセージの内で、既に表示されているメッセージを削除している
            data.messages.forEach(function(data){
              if(current_user_name !== data.name){ // このように表記することによって、自分が書いた文章を出力しないようにしている
                // そうしないと、SENDボタンを押された時に出力された自分のコメントと、この一連の処理によって取得された自分のコメントが重複し、同じコメントが２重で表示される
                var html = buildHTML(data);
                $('.right-main__chat-main').append(html);
              };
            });
          };
      })
      .fail(function() {
        alert('error');
      });
      count = precount
    }else{
      clearInterval(interval);
    }
  },5000);
});
