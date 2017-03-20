// Dependencies
var express = require("express");
var app = express();

//body-parser boilerplate
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//handlebars boilerplate
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//requiring models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

//require controllers
var routes = require("./controllers/api-routes.js");
app.use("/", routes);

//declare port
var port = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.listen(port, function() {
  console.log("App running on port 3000!");
});