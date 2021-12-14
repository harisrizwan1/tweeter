$(document).ready(function() {
  const $input = $('#tweet-text');
  $input.on('keypress', (event) => {
    console.log(event.target.value);
  });
});