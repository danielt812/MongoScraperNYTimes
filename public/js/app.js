function getArticles() {
//Home
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
            var cardSave = $('<a>');
            cardSave.attr('href', '/saveArticle');
            cardSave.attr('data-id', data[i]._id);
            cardSave.addClass('btn btn-primary save');
            cardSave.text("Save Article");
            
            //Appending elements
            card.append(cardBody, cardTitle, cardLink, cardSave)
            //Appending card to DOM
            $('#articles').append(card)
        }
    });
}
function getSaved() {
//Saved
    $.getJSON('/savedArticles', function(data) {
        for(var i = 0; i < data.length; i++) {
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
            var cardDelete = $('<a>');
            cardDelete.attr('data-id', data[i]._id);
            cardDelete.attr('href', '/deleteArticle/' + data[i]._id);
            cardDelete.addClass('btn btn-danger delete');
            cardDelete.text("Delete Article");
            var cardNote = $('<a>');
            // cardNote.attr('href', '/addNote');
            cardNote.attr('data-toggle', 'modal');
            cardNote.attr('data-target', 'noteModal');
            cardNote.addClass('btn btn-info note');
            cardNote.text('Add Note');
            
            //Appending elements
            card.append(cardBody, cardTitle, cardLink, cardDelete, cardNote)
            //Appending card to DOM
            $('#savedArticles').append(card)
        }
    });
}


//Event handlers
$('body').on('click', '.save', function(e) {
    e.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/savedArticles/" + thisId
    })
    .then(function(data) {
        console.log("POST SUCCESSFUL");
    })
})

$('body').on('click', '.delete', function(e) {
    e.preventDefault();
    var deleteId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/deleteArticle/" + deleteId
    })
    .then(function(data) {
        console.log("Delete Successful")
        $('#savedArticles').empty();
        getSaved();
    })
})


getArticles();
getSaved();