// dependencies
var async = require('async'),
    users = require('./users.js'),
    twitter = require('./twitter.js'),
    // facebook = require('./facebook.js'),
    instagram = require('./instagram.js'),
    compiler = require('./compiler.js')
    ;

var routes = function (userObj, callback) {
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
        twitter.buildApiRequests(twitterQueriesObj, function (err, twitterApiRequests) {
          if (err) { throw (err); } // throw errors for now
          // query API
          twitter.doQuery(twitterApiRequests, function (err, rawTwitterResponses) { // !!
            if (err) { throw (err); }
            twitter.parseResponse(rawTwitterResponses, function (err, normalizedTwitterResponses) {
              // returned normalized twitter responses to compiler
              asyncCallback (null, null);
            })
          })
        })
      },
      facebook: function (asyncCallback) {
        // FACEBOOK STUFF GOES HERE
        asyncCallback (null, null);
      },
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
        console.log(results);
        compiler.merge(results, function (err, finalPostObject) {
          if (err) { throw (err); }
          // return compiled final object
          return callback (null, finalPostObject);
        })
      }
    })
  })
}

module.export = routes;
