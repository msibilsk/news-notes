// Dependencies
var express = require("express");
var mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_5dx6346c:5kddirfnhs09b9r3k4ora5pkk5@ds137100.mlab.com:37100/heroku_5dx6346c");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//initialize express app
var app = express();

//body-parser boilerplate
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars boilerplate
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up an Express Router
var router = express.Router();

// Require routes file pass router object
require("./config/routes")(router);

//requiring models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Have every request go through router middleware
app.use(router);

//declare port
var port = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.listen(port, function() {
  console.log("App running on port 3000!");
});