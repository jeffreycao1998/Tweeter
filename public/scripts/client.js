/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( () => {
  const tweetInput = $('#tweet-input')
  const tweetMessage = tweetInput.val()
  const tweetLength = tweetInput.length;
  const tweetError = $('.tweet-error-message');

  const calculateDaysSince = (previousDate) => {
    const date = Date.now();

    return Math.round((date - previousDate) / 1000 / 60 / 60 / 24);
  }

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
    const daysAgo = calculateDaysSince(dateCreated);

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
        <p>${daysAgo} days ago</p>
        <div class="tweet-buttons">
          <ion-icon name="flag"></ion-icon>
          <ion-icon name="repeat"></ion-icon>
          <ion-icon name="heart"></ion-icon>
        </div>
      </footer>
    </div>`;

    return tweetHTML;
  };

  // Appends new tweets to top of list of tweets
  const renderTweets = (tweetsArray) => {
    tweetsArray.forEach(tweet => {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    });
  };

  // GETs tweets from server database
  const loadTweets = () => {
    jQuery.get('http://localhost:8080/tweets/', function(tweets) {
      renderTweets(tweets);
    });
  };

  const tweetErrorTimeouts = [];

  // resets timeout countdown
  const resetTimeout = () => {
    const timeout = setTimeout(() => {
      tweetError.slideUp('slow');
    }, 4000);

    if (tweetErrorTimeouts.length === 0) {
      tweetErrorTimeouts.push(timeout);
    } else {
      clearTimeout(tweetErrorTimeouts[0])
      tweetErrorTimeouts.shift();
      tweetErrorTimeouts.push(timeout);
    }
  }

  // shows error message if tweet is too short/long
  const tweetIsLongEnough = () => {
    
    if (tweetLength === 0) {
      tweetError.text('Tweet too short! Go on, write your story to the world!');
      tweetError.slideDown('slow');

      resetTimeout();
      return false;

    } else if (tweetLength > 140) {
      tweetError.text('TMI, cut your story down a bit!');
      tweetError.slideDown('slow');

      resetTimeout();
      return false;
    }
    return true;
  }

  // Submits a new tweet to server if passes character count and renders it to the page
  $('.submit-tweet').on('click', function(event) {
    event.preventDefault();

    if (!tweetIsLongEnough()) return;

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
      tweetInput.focus();
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });

  loadTweets();
});