/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $("form").on('submit' ,function(event) {
    event.preventDefault();
    const text = $(this).serialize();
    $.ajax({
      url: "/tweets/",
      method: 'POST',
      data: text
    })

  });

const createTweetElement = function(tweet) {
  const user = tweet.user;
  const content = tweet.content;
  const time = tweet.created_at;
  const datetime = moment(time).fromNow();

  const $tweet = $(`
  <article class="tweet-article">
        <div class="bottom-panel">
          <div class="user">
            <img class="avatar" src="${user.avatars}"></i>
            <span class="item a">${user.name}</span>
          </div>
          <span class="item b">${user.handle}</span>
        </div>
        <div class="item c">${content.text}</div>
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

const renderTweets = function(tweets) {
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


renderTweets(data);

});