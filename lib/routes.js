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
        twitter.getPosts(queriesObj.twitter, function (err, twitterPosts) {
          callback(null, twitterPosts)
        })
      }
    },
    // async callback
    function (err, posts) {
      // posts
    });
  });
}

module.export = routes;
