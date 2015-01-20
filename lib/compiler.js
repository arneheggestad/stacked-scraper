var postCompiler = {
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
            mergedPosts[ ssUserId ].last[ network ] = unmergedPosts[ network ][ ssUserId ].last;
            // merge posts
            var userMergedPosts = mergedPosts[ ssUserId ].posts;
            for (var i = 0; i < unmergedPosts[ network ][ ssUserId ].posts.length; i++) {
              userMergedPosts.push(unmergedPosts[ network ][ ssUserId ].posts[ i ]);
            }
          }
        }
      }
    }
    return callback (null, mergedPosts);
  }
}

module.exports = postCompiler;
