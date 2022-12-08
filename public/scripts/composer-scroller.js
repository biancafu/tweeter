$(document).ready(function () {
  // --- our code goes here ---
  $(document).on('scroll', function() {
    if ($(this).scrollTop() >= 350) {
      $("nav").hide();
      $("#scroll-button").show();
    } else if ($(this).scrollTop() < 350) {
      $("nav").show();
      $("#scroll-button").hide();
    }
  })
});


