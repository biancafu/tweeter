$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on('keyup', function () {
    let length = $(this).val().length;
    let result = 140 - length;
    if (result < 0) {
      $(this).closest("form").find("output").addClass("negative");
    }
    $(this).closest("form").find("output").text(result);

  })
});


