var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");
var Article = require("../models/Article");

module.exports = {
  fetch: function(cb) {

    scrape(function(data) {
      
      var articlesArr = data;
      // Make sure each article object has a date and is not saved by default
      for (var i = 0; i < articlesArr.length; i++) {
        articlesArr[i].date = makeDate();
        articlesArr[i].saved = false;
      }
      
      //filters the duplicate articles because the article model says the title must be unique
      Article.collection.insertMany(articlesArr, { ordered: false }, function(err, docs) {
        cb(err, docs);
      });
    });
  },
  get: function(query, cb) {
    //query is currently hardcoded to {saved: true}
    Article.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        //send saved articles back to routes to be rendered
        cb(doc);
      });
  },
  update: function(query, cb) {  
    // saves or unsaves an article depending on the user query comes from the patch request in app.js
    Article.update({ _id: query.id }, {
      $set: {saved: query.saved}
    }, {}, cb);
  }
};