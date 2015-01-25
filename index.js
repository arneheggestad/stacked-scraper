var scraper = function (secrets) {
  // dependencies
  var async = require('async'),
      users = require('./lib/users.js'),
      twitter = require('./lib/twitter.js')(secrets),
      facebook = require('./lib/facebook.js'),
      instagram = require('./lib/instagram.js'),
      collator = require('./lib/collator.js')
      ;

  return function (userObj, callback) {
    // GENERAL FLOW
    // take userObj, which contains Stacked Sports User IDs and associated networks and token
    // reconfigure userObj by network
    users.parseUsers(userObj, function (err, masterQueriesObj) {
      if (err) { throw (err); } // throw errors for now
      var twitterQueriesObj = masterQueriesObj.twitter,
          facebookQueriesObj = masterQueriesObj.facebook,
          instagramQueriesObj = masterQueriesObj.instagram;
      // pass appropriate reconfigured userObj to each network
      async.parallel({
        twitter: function (asyncCallback) {
          if (twitterQueriesObj === undefined) {
            asyncCallback(null, null);
          } else {
            twitter.getPosts(twitterQueriesObj, function (err, normalizedTwitterPosts) {
              if (err) {
                asyncCallback (err);
              } else {
                asyncCallback (null, normalizedTwitterPosts);
              }
            })
          }
        },
        facebook: function (asyncCallback) {
          if (facebookQueriesObj === undefined) {
            asyncCallback(null, null);
          } else {
            facebook.getPosts(facebookQueriesObj, function (err, normalizedFacebookPosts) {
              if (err) {
                asyncCallback (err);
              } else {
                asyncCallback (null, normalizedFacebookPosts);
              }
            })
          }
        },
        instagram: function (asyncCallback) {
          if (instagramQueriesObj === undefined) {
            asyncCallback(null, null);
          } else {
            instagram.getPosts(instagramQueriesObj, function (err, normalizedInstagramPosts) {
              if (err) {
                asyncCallback (err);
              } else {
                asyncCallback (null, normalizedInstagramPosts);
              }
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
          return callback (err);
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
}

module.exports = scraper;
