// generates tweet element
const createTweetElement = function(data) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <img src=${data.user.avatars} />
        <p>${data.user.name}</p>
        <p>${data.user.handle}</p>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <hr>
        <section>
          <time>${timeago.format(data.created_at)}</time>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </seciton>
      </footer>
    </article>
  `);
  return $tweet;
};

// iterates over tweets in database and renders them
const renderTweets = function(tweets) {
  const $container = $("#tweets-container");
  for (const tweet of tweets) {
    const $createdTweet = createTweetElement(tweet);
    $container.prepend($createdTweet);
  }
};

// loads tweets using ajax get request
const loadTweets = function() {
  $.ajax('http://localhost:8080/tweets', {method: "GET"})
    .then(function(data) {
      renderTweets(data);
    });
};

// escape function
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// toggle slider for new tweet
const tweetToggle = function() {
  $('#new-tweet-form').slideToggle(function() {
    $('#tweet-text').focus();
  });
};

// functions for toTop button
$(window).scroll(function() {
  if ($(this).scrollTop()) {
    $('#toTop').fadeIn();
    $('#slide-toggle').fadeOut();
  } else {
    $('#toTop').fadeOut();
    $('#slide-toggle').fadeIn();
  }
});

$("#toTop").click(function() {
  $("html, body").animate({scrollTop: 0}, 1000);
  $('#new-tweet-form').slideDown(function() {
    $('#tweet-text').focus();
  });
});

// darkmode toggle handler
$(function() {
  $(".fa-adjust").click(function() {
    $("body").toggleClass("dark-mode");
    $("article.tweet").toggleClass("dark-mode");
    $("article.tweet hr").toggleClass("dark-mode");
    $("#tweet-text").toggleClass("dark-mode");
    $("#profile").toggleClass("dark-mode");
    $("article.tweet footer section div").toggleClass("dark-mode");
  });
});

// funciton handler for submit
const tweetSubmitter = function(event) {
  event.preventDefault();
  const $error = $(this).children('.error');
  const text = $(this).children('#tweet-text').val();
  $error.slideUp().empty();

  // check if input is valid
  if (!text) {
    $error.append("Tweets cannot be blank").slideDown();
    return false;
  } else if (text.length > 140) {
    $error.append("Tweet is too long!").slideDown();
    return false;
  }

  $.ajax({
    method: "POST",
    url: "http://localhost:8080/tweets/",
    data: $(this).serialize(),
    success: function() {
      // reload content without refreshing page
      $("#tweets-container").empty();
      loadTweets();
    }
  });
  
  // reset the form
  $('#new-tweet-form').trigger("reset");
  $('.counter').text(140);
};

$(document).ready(function() {
  // calls loadtweets funtion
  loadTweets();

  // listen for toggle click
  $('#slide-toggle').click(tweetToggle);

  // request handler for new tweet submission
  $('#new-tweet-form').submit(tweetSubmitter);
});
