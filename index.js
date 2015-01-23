// module dependencies
var async = require('async');

var scraper = function (userObj, secrets, callback) {
  // method dependencies
  var users = require('./lib/users.js'),
      twitter = require('./lib/twitter.js')(secrets),
      facebook = require('./lib/facebook.js'),
      instagram = require('./lib/instagram.js'),
      collator = require('./lib/collator.js')
      ;

	// GENERAL FLOW
  // take userObj, which contains Stacked Sports User IDs and associated networks and token
  // reconfigure userObj by network
  users.parseUsers(userObj, function (err, masterQueriesObj) {
    if (err) { throw (err); } // throw errors for now
    var twitterQueriesObj = masterQueriesObj.twitter;
    var facebookQueriesObj = masterQueriesObj.facebook;
    var instagramQueriesObj = masterQueriesObj.instagram;
    // pass appropriate reconfigured userObj to each network
    async.parallel({
      twitter: function (asyncCallback) {
        if (twitterQueriesObj === undefined) {
          asyncCallback(null, null);
        } else {
          twitter.getPosts(twitterQueriesObj, function (err, normalizedTwitterPosts) {
            asyncCallback (null, normalizedTwitterPosts);
          })
        }
      },
      facebook: function (asyncCallback) {
        // FACEBOOK STUFF GOES HERE
        if (facebookQueriesObj === undefined) {
          asyncCallback(null, null);
        } else {
          facebook.getPosts(facebookQueriesObj, function (err, normalizedFacebookPosts) {
            asyncCallback (null, null);
          })
        }
      },
      instagram: function (asyncCallback) {
        if (instagramQueriesObj === undefined) {
          asyncCallback(null, null);
        } else {
          instagram.getPosts(instagramQueriesObj, function (err, normalizedInstagramPosts) {
            asyncCallback (null, normalizedInstagramPosts);
          })
        }
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

module.exports = scraper;
