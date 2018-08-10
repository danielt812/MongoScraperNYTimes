//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');

//Express
var app = express();
var PORT = 3000 || process.env.PORT;

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static
app.use(express.static(path.join(__dirname, 'public')));

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Routes
require('./controller/controller.js')(app);

//Listener
app.listen(PORT, function() {
    console.log("Listening on localhost:" + PORT);
});