$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const count = $(this).val().length;
    const $counter = $(this).next().children('.counter');
    $($counter).text(140 - count);
    if (count > 140) {
      $($counter).addClass("negative-counter");
    } else {
      $($counter).removeClass("negative-counter");
    }
  });
});