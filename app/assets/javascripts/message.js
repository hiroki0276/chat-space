$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main-chat__message-list__message">
            <div class="main-chat__message-list__message__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message_date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>`
      return html;
    } else {
      let html =
      `<div class="main-chat__message-list__message">
          <div class="main-chat__message-list__message__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__message_date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }
  $(".main-chat__message-form").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('.main-chat__message-form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.input-submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.input-submit').prop('disabled', false);
    });
  })
})