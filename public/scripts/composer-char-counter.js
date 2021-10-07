$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")

  let counter = $('output.counter');
  //console.log(counter);
  let textCount = 0;
  $('#tweet-text').on("input", () => {
      textCount = $('#tweet-text').val().length;
      //console.log(textCount);
      counter[0].value = 140 - textCount;
      //console.log($('#tweet-text').val().length);
      if (counter[0].value < 0) {
        counter.addClass("counterNeg");
      } else {
        counter.removeClass("counterNeg");
      }
  })
});

