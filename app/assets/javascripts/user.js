$(function() {
    function buildHTML(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
    return html;
  }

    function ReBuildHTML(name,id){
      var Rehtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      return Rehtml;
    }


  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val().trim();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json',
    })
      .done(function(data) {
        $('#user-search-result').empty();
          if (data.length !== 0 && input != 0) {
            data.forEach(function(data){
              var html = buildHTML(data);
              $('#user-search-result').append(html);
            });
          }
          else {
            $('#user-search-result').append('一致するユーザーが存在しません');
          }
      })
      .fail(function() {
        alert('error');
      });
  });

  $(document).on("click", ".user-search-add", function(){

    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    var Rehtml = ReBuildHTML(name,id);
    $(this).parent().remove();
    $('#chat-group-users').append(Rehtml);
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
