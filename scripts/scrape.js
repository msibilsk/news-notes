var request = require("request");
var cheerio = require("cheerio");

//handles scraping the articles from NYT
var scrape = function(cb) {

  var articlesArr = [];

  request("https://www.nytimes.com/", function(error, response, html) {

      var $ = cheerio.load(html);


      $("h2.story-heading").each(function(i, element) {

          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      cb(articlesArr);
  });

};

module.exports = scrape;
