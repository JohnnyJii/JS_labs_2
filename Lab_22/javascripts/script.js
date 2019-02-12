const APP = (function() {

  let _init = function() {
    _bindEvents();
  };

  let _bindEvents = function() {
    $('#form_shorten').on('submit', function(e) {
      e.preventDefault();
      let url = $.trim($('.text-url').val());
      console.log(url);
      $.ajax({
        url: '/shorten',
        type: 'POST',
        data: {
          url: url
        },
        success: function(data) {
          console.log(data);
          let _buildUrl = window.location.origin + '/' + data.hash;
          $('.shortened-url').html('<a href="' + _buildUrl + '" target="_blank">' + _buildUrl + '</a>');
          $('#shorten_area').removeClass('hide').show();
        }
      })
    });
  };

  return {
    init: _init
  };

})();

$(function() {
  APP.init();
});