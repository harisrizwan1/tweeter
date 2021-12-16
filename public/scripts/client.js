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

$(document).ready(function() {
  // calls loadtweets funtion
  loadTweets();

  // request handler for new tweet submission
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const $error = $(this).children('.error');
    $error.slideUp().empty();
    const text = $(this).children('#tweet-text').val();

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
  });
});
