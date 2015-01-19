// dependencies
var async = require('async'),
    users = require('./users.js'),
    twitter = require('./twitter.js')
    ;

var routes = function (userObj) {
  users.parseUsers(userObj, function (err, queriesObj) {
    if (err) { throw (err); }
    async.parallel({
      twitter: function (callback) {
        twitter.getPosts(queriesObj.twitter, function (err, twitterResponse) {
          if (err) { throw (err); }
          twitter.parseResponse(twitterResponse, function (err, parsedResponse) {
            callback (null, parsedResponse);
          })
        })
      }
    },
    // async callback
    function (err, posts) {
      if (err) { throw (err); }
      // consolidate posts
    });
  });
}

module.export = routes;
