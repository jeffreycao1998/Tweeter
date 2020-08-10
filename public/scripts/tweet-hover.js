$('.tweet-container').on('mouseenter', function() {
  $(this).css('box-shadow', '10px 10px rgb(189, 189, 207)');
  $('.tweeter-handler').css('color', 'rgb(189, 189, 207)');
  $('.tweet-container').css('font-weight', '300');
  $('ion-icon').css('font-size', '17px');
});

$('.tweet-container').on('mouseleave', function() {
  $(this).css('box-shadow', 'none');
  $('.tweeter-handler').css('color', '#f4f1ec');
  $('.tweet-container').css('font-weight', '200');
  $('ion-icon').css('font-size', '16px');
});


// color: rgb(209, 209, 209)