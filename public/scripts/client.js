/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // when a tweet is submitted
  $("form").on('submit', function (event) {
    //stops page from reloading
    event.preventDefault();
    const formData = $(this).serialize();
    const text = $("#tweet-text").val();

    //error messages if the text is empty or too long
    if (!text) {
      $("#error-message").text('!!! cannot submit empty tweet !!!');
      $("#error-message").show();
      return;
    } else if (text.length > 140) {
      $("#error-message").text('!!! text length exceeded limit !!!');
      $("#error-message").show();
      return;
    } else {
      $("#error-message").text('');
    }
    $.ajax({
      url: "/tweets/",
      method: 'POST',
      data: formData
    })
      //if tweet was succesfully posted, the tweet should show below right away
      .then(() => {
        
        $.ajax({
          url: "/tweets/",
          method: 'GET',
        })
          .then((data) => {
            renderTweets(data.slice(data.length-1));
            $("#tweet-text").val('');
            $(".counter").val('140');
          })

        //since clearing out the tweets-container is visible when loading,
        //instead of clearing the whole tweet section and calling loadtweets,
        //I decided to get only the new tweet so that the clearing is not visible. below is the code that clears the tweet:

        // $(".tweets-container").empty();
        // $("#tweet-text").val('');
        // $(".counter").val('140');
        // loadTweets();
      })
  });

  //load tweet to get all previous tweets and render them
  const loadTweets = function () {
    $.ajax({
      url: "/tweets/",
      method: 'GET',
    })
      .then((data) => {
        renderTweets(data);
      })
  };

  //escape function to prevent cross site scripting by untrust text
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //creating html tweet element for each tweet
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
            <div class="c"><p>${escape(content.text)}</p></div>
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
  //rendering all tweets that are passed
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet_html = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').append($tweet_html)
    }
  }
  //get the previous tweets 
  loadTweets();


  //stretch - slide up and down when the write new tweet is clicked
  $(".new").on("click", function () {
    if ($(".new-tweet").first().is(":hidden")) {
      $(".new-tweet").slideDown();
    } else {
      $(".new-tweet").slideUp();
    }
  })

  //stretch - scroll back up when button is hovered
  $("#scroll-button").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    $(".new-tweet").show();
  })
});