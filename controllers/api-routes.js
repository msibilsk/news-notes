//require models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

//mongoose orm boilerplate
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

//create router to export
var express = require("express");
var router = express.Router();

//for web scraping
var request = require("request");
var cheerio = require("cheerio");

//index route
router.get("/", function(req, res) {
    console.log("TRYING TO GET");
    Article.find({}, function(error, found) {
        if (error) {
            console.log(error);
        } else {
            var hbsObject = {
                articles: found
            };
            res.render("index", hbsObject);
        }
    });
});

router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("https://www.nytimes.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("h2.story-heading").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});


module.exports = router;
