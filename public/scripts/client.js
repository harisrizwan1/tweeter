$(document).ready(function() {
  const createTweetElement = function(data) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src=${data.user.avatars} />
          <p>${data.user.name}</p>
          <p>${data.user.handle}</p>
        </header>
        <p>${data.content.text}</p>
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
  
  const renderTweets = function(tweets) {
    const $container = $("#tweets-container");
    for (const tweet of tweets) {
      const $createdTweet = createTweetElement(tweet);
      $container.prepend($createdTweet);
    }
  };

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', {method: "GET"})
      .then(function(data) {
        renderTweets(data);
      });
  };

  loadTweets();

  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const text = $(this).children('#tweet-text').val();
    if (!text) {
      alert("Tweet cannot be blank");
      return false;
    } else if (text.length > 140) {
      alert("Tweet is too long!");
      return false;
    }
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data: $(this).serialize(),
      success: function() {
        $("#tweets-container").empty();
        loadTweets();
      }
    });
  });
});
