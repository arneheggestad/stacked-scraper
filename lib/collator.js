var postCollator = {
  merge: function (unmergedPosts, callback) {
    var mergedPosts = {};
    for (var network in unmergedPosts) {
      if (unmergedPosts.hasOwnProperty(network)) {
        for (var ssUserId in unmergedPosts[ network ]) {
          if (unmergedPosts[ network ].hasOwnProperty(ssUserId)) {
            // check if we have posts for a given user already; if not, start a new array
            if (!mergedPosts[ ssUserId ]) {
              mergedPosts[ ssUserId ] = {
                last: {
                  timestamp: Date.now()
                },
                posts: []
              };
            }
            // set the last tracker for each network
            mergedPosts[ ssUserId ].last[ network ] = unmergedPosts[ network ][ ssUserId ][ network ].last;
            // merge posts
            var userMergedPosts = mergedPosts[ ssUserId ].posts;
            for (var i = 0; i < unmergedPosts[ network ][ ssUserId ][ network ].posts.length; i++) {
              userMergedPosts.push(unmergedPosts[ network ][ ssUserId ][ network ].posts[ i ]);
            }
          }
        }
      }
    }
    postCollator.sort(mergedPosts, function (err, sortedPosts) {
      return callback (null, sortedPosts);
    })
  },
  sort: function (mergedPosts, callback) {
    var users = Object.keys(mergedPosts);
    for (var i = 0; i < users.length; i++) {
      var posts = mergedPosts[ users[ i ] ].posts;
      posts.sort(function (a, b) {
        if (a.timestamp > b.timestamp) {
          return -1;
        } else if (a.timestamp < b.timestamp) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return callback (null, mergedPosts);
  }
}

module.exports = postCollator;
