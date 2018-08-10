{/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src=".../100px180/" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}

$.getJSON('/articles', function(data) {
    for(var i = 0; i < 21; i++) {
        // Generate 20 bootstrap cards
        var card = $('<div>');
        card.addClass('card');
        var cardBody = $('<div>');
        cardBody.addClass('card-body');
        var cardTitle = $('<h5>');
        cardTitle.addClass('card-title');
        cardTitle.text(data[i].title);
        // var cardText = $('<p>');
        // cardText.addClass('card-text');
        // cardText.text("Placeholder");
        var cardLink = $('<a>');
        cardLink.attr('href', data[i].link);
        cardLink.addClass('btn btn-primary');
        cardLink.text("View Article");
        
        //Appending elements
        card.append(cardBody, cardTitle, cardLink)
        //Appending card to DOM
        $('#articles').append(card)
    }
});


//Event handlers
// $('#clear').on('click', function() {
//     $('#articles').empty();
// });

// $('#scrape').on('click', function() {
//     alert("working");
//     showArticles();
// })

// showArticles();