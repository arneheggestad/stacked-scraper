// dependencies
var async = require('async'),
    users = require('./users.js'),
    twitter = require('./twitter.js'),
    // facebook = require('./facebook.js'),
    instagram = require('./instagram.js'),
    collator = require('./collator.js')
    ;

module.exports = function (userObj, callback) {
  // GENERAL FLOW
  // take userObj, which contains Stacked Sports User IDs and associated networks and token
  // reconfigure userObj by network
  users.parseUsers(userObj, function (err, masterQueriesObj) {
    if (err) { throw (err); } // throw errors for now
    var twitterQueriesObj = masterQueriesObj.twitter;
    // var facebookQueriesObj = masterQueriesObj.facebook;
    var instagramQueriesObj = masterQueriesObj.instagram;
    // pass appropriate reconfigured userObj to each network
    async.parallel({
      twitter: function (asyncCallback) {
        twitter.getPosts(twitterQueriesObj, function (err, normalizedTwitterPosts) {
          asyncCallback (null, normalizedTwitterPosts);
        })
      },
      // facebook: function (asyncCallback) {
      //   // FACEBOOK STUFF GOES HERE
      //   asyncCallback ();
      // },
      instagram: function (asyncCallback) {
        instagram.getPosts(instagramQueriesObj, function (err, normalizedInstagramPosts) {
          asyncCallback (null, normalizedInstagramPosts);
        })
      }
    },
    // async callback:
      // receive normalized posts from each network
      // compile all posts into final object by ssUserId
    function (err, results) {
      // results should be { twitter: {twitterPosts}, facebook: {facebookPosts}, ... }
      if (err) {
        throw (err); // for now; fix this soon
      } else {
        // console.log(results);
        collator.merge(results, function (err, finalPostObject) {
          if (err) { throw (err); }
          // return compiled final object
          return callback (null, finalPostObject);
        })
      }
    })
  })
}
