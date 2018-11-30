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
