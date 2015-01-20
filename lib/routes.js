// dependencies
var async = require('async'),
    users = require('./users.js'),
    twitter = require('./twitter.js')
    ;

var routes = function (userObj, callback) {
  // GENERAL FLOW
  // take userObj, which contains Stacked Sports User IDs and associated networks and token
  // reconfigure userObj by network
  users.parseUsers(userObj, function (err, masterQueriesObj) {
    if (err) { throw (err); } // throw errors for now
    var twitterQueriesObj = masterQueriesObj.twitter;
    // var facebookQueriesObj = masterQueriesObj.facebook;
    // var instagramQueriesObj = masterQueriesObj.instagram;
    // pass appropriate reconfigured userObj to each network
    async.parallel({
      twitter: function (callback) {
        twitter.buildApiRequests(twitterQueriesObj, function (err, twitterApiRequests) {
          if (err) { throw (err); } // throw errors for now
          // query API
          twitter.doQuery(twitterApiRequests, function (err, rawTwitterResponses) { // !!
            if (err) { throw (err); }
            twitter.parseResponse(rawTwitterResponses, function (err, normalizedTwitterResponses) {
              // returned normalized twitter responses to compiler
            })
          })
        })
      },
      facebook: function (callback) {
        //
      },
      instagram: function (callback) {
        //
      }
    },
    // async callback
    // receive normalized posts from each network
    // compile all posts into final object by ssUserId
    function (err, results) {
      console.log(results);
      // return compiled final object
      var finalPostObject = {};
      return callback (null, finalPostObject);
    })
  })
}

module.export = routes;
