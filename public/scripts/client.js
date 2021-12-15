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
    for (const tweet of tweets) {
      const $createdTweet = createTweetElement(tweet);
      $("#tweets-container").append($createdTweet);
    }
  };

  $('#new-tweet-form').on('submit', (event) => {
    event.preventDefault();
    console.log('worked');
  });
});
