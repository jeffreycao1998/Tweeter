$(document).ready(function() {
  console.log('potato');
});

$('#tweet-text').on('keyup', function() {
  const tweetLength = $(this).val().length;
  const counter = $(this).next().children('.counter');

  counter.text(140 - tweetLength);
  if (tweetLength > 140) {
    counter.css('color', 'red');
  } else {
    counter.css('color', 'rgb(88, 72, 65)');
  }
});