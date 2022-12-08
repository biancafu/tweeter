/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $("form").on('submit', function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const text = $("#tweet-text").val();
    if (!text) {
      alert("tweet cannot be empty!");
      return;
    } else if (text.length > 140) {
      console.log(text.length);
      alert("text length exceeded limit!");
      return;
    }
    $.ajax({
      url: "/tweets/",
      method: 'POST',
      data: formData
    })
    .then(() => {
      $.ajax({
        url: "/tweets/",
        method: 'GET',
      })
      .then((data) => {
        renderTweets(data);
        $("#tweet-text").val('');
        $(".counter").val('140');
      })
    })
  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets/",
      method: 'GET',
    })
    .then((data) => {
      renderTweets(data);
    })
  }
  const createTweetElement = function (tweet) {
    const user = tweet.user;
    const content = tweet.content;
    const time = tweet.created_at;
    const datetime = timeago.format(time);

    const $tweet = $(`
  <article class="tweet-article">
        <div class="bottom-panel">
          <div class="user">
            <img class="avatar" src="${user.avatars}"></i>
            <span class="item a">${user.name}</span>
          </div>
          <span class="item b">${user.handle}</span>
        </div>
        <div class="c"><p>${content.text}</p></div>
        <div class="bottom-panel">
          <div class="item d">${datetime}</div>
          <div class="item e">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>

      </article>
  `);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet
      const $tweet_html = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').append($tweet_html)
    }
  }
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  loadTweets();


});