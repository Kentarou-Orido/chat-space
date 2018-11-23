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
  $('#js-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data) {
        var html = buildHTML(data);
        $('.right-main__chat-main').append(html);
        $('.right-main__chat-main').scrollTop($(".right-main__chat-main")[0].scrollHeight);
    })
      .fail(function() {
        alert('error');
      });
    return false;
  });
});
