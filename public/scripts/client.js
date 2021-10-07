/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!");

  // escape function for troublesome tweets
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // get request to /tweets to load them
  const loadTweets = () => {

    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  
  // create a layout for a new tweet. using escape function to check if tweet is valid
  const createTweetElement = (tweet) => {
    const markup = `
    <article>
    <!-- class="name-username" -->
    <header class="tweet-header">
      <div>
      <img class="profile" src=${tweet["user"]["avatars"]}>
      <span>${tweet["user"]["name"]}</span>
      </div>
      <span>${tweet["user"]["handle"]}</span>
    </header>
    <p class="tweet"> ${escape(tweet["content"]["text"])} </p>
    <footer class="tweet-footer">
      <span> ${timeago.format(tweet["created_at"])} </span>
      <div><i class="fa-solid fa-flag"> </i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></div>
    </footer>
    </article>
    `
    return markup;
  }

  // function to render array of tweets
  const renderTweets = function(tweets) {
    // empty the container of tweets
    const $tweetsContainer = $("#tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  }

  // target form and post tweet on tweet submit button
  const $newTweet = $("form");
  $newTweet.on("submit", function(event) {

    event.preventDefault();

    // set error message to hidden
    document.getElementById("errors").style.visibility = "hidden";

    // get input and check if input is too long or short
    const serializedData = $(this).serialize();
    textCount = $('#tweet-text').val().length;
    if (textCount <= 0) {
      $("#errors").html('<i class="fa-solid fa-triangle-exclamation"></i> Please enter a tweet! <i class="fa-solid fa-triangle-exclamation"></i>');
      document.getElementById("errors").style.visibility = "visible";
      $("#errors").slideDown('slow')
      return;
    } else if (textCount > 140) {
      $("#errors").html('<i class="fa-solid fa-triangle-exclamation"></i> You have entered a message too long! <i class="fa-solid fa-triangle-exclamation"></i>');
      document.getElementById("errors").style.visibility = "visible";
      $("#errors").slideDown('slow')
      return;
    }
    
    // delete what's in the text-box
    $('form').trigger('reset');

    // post the tweet
    $.post("/tweets", serializedData, (response) => {
      loadTweets();
    })
  })


  
});

