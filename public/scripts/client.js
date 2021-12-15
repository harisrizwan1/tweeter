/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

// Fake data taken from initial-tweets.json
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