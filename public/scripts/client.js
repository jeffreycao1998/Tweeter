/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( () => {

  // GETs tweets from server database
  const loadTweets = () => {
    jQuery.get('http://localhost:8080/tweets/', function(tweets) {
      renderTweets(tweets);
    });
  };

  // Appends new tweets to top of list of tweets
  const renderTweets = (tweetsArray) => {
    tweetsArray.forEach(tweet => {
      const previousTweets = $('#tweets-container').html();
      const newTweet = createTweetElement(tweet);

      $('#tweets-container').html(newTweet + previousTweets);
    });
  };

  // Ensures embedded HTML/JS gets read as plain text
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Returns a tweet object filled with all of it's associated data
  const createTweetElement = (tweet) => {
    const name = tweet.user.name;
    const avatarUrl = tweet.user.avatars;
    const handle = tweet.user.handle;
    const content = tweet.content.text;
    const dateCreated = tweet.created_at;
    const date = Date.now();

    const tweetHTML = 
    `<div class="tweet-container">
      <header>
        <div class="username">
          <img src="${avatarUrl}" alt="Avatar">
          <p>${name}</p>
        </div>
        <h3 class="tweeter-handler">${handle}</h3>
      </header>
      <p class="tweet">${escape(content)}</p>
      <footer>
        <p>${Math.round((date - dateCreated) / 1000 / 60 / 60 / 24)} days ago</p>
        <div class="tweet-buttons">
          <ion-icon name="flag"></ion-icon>
          <ion-icon name="repeat"></ion-icon>
          <ion-icon name="heart"></ion-icon>
        </div>
      </footer>
    </div>`;

    return tweetHTML;
  };

  // Submits a new tweet to server if passes character count and renders it to the page
  $('.submit-tweet').on('click', function(event) {
    event.preventDefault();
    const tweet = $('#tweet-input').val();
    const tweetError = $('.tweet-error-message');
    const tweetLength = tweet.length;



    if (tweetLength === 0 || tweetLength > 140) {
      tweetError.text('⚠️Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.⚠️');
      tweetError.slideDown('slow');
      return;
    }

    jQuery.post('http://localhost:8080/tweets/', { 
      text: $('#tweet-input').val(),
    })
    .then((res) => {
      renderTweets([res]);
    });
  });

  // Toggles form
  $('.toggle-form').on('click', () => {
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown('slow');
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });

  loadTweets();
});