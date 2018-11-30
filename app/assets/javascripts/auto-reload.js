$(function() {
  function buildHTML(message){
      var image = `<img class= "right-main__chat-main__message__image" src= ${message.image.url}>`;
      if (message.image.url == null){
        image = ``;
      }
      var html = `<div class= "right-main__chat-main__message" data-message-id= "${message.id}">
                    <div class= "right-main__chat-main__message__name">
                      ${message.name}
                    </div>
                    <div class= "right-main__chat-main__message__time">
                      ${message.date}
                    </div>
                    <div class= "right-main__chat-main__message__body">
                      ${message.body}
                    </div>
                    ${image}
                  </div>`
    return html;
  }

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        var newestMessageId = $('.right-main__chat-main__message').last().data('messageId');
            data.messages.forEach(function(data){
              if(data.id > newestMessageId){
                var html = buildHTML(data);
                $('.right-main__chat-main').append(html);
                $('.right-main__chat-main').scrollTop($(".right-main__chat-main")[0].scrollHeight);
              };
          });
      })
      .fail(function() {
        alert('error');
      });
    }else{
      clearInterval(interval);
    }
  },5000);
});
