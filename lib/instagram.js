var secrets = require('../credentials/secrets.js');

var instagram = {
  // get raw data
  getPosts: function (igUsers, callback) {
    var igResponses = {};
    return callback (null, igResponses);
  },
  // normalize posts
  normalizePosts: function (igResponses, callback) {
    var normalizedPosts = {};
    Object.keys(igResponses).forEach( function (key) {
      var data = igResponses[ key ].data;
      normalizedPosts[ key ] = {
        instagram: {
          posts: [],
          last: 0
        }
      };
      var last = 0;
      var length = data.length;
      for (var i = 0; i < length; i++) {
        var tmp = {};
        var tmpPost = data[ i ]; // reference to the current post
        tmp.postId = tmpPost.id;
        tmp.userId = key;
        tmp.source = {
          network: 'instagram',
          data: tmpPost
        };
        tmp.content = {
          text: tmpPost.caption.text
        }
        if (tmpPost.images) {
          tmp.content.img = [ tmpPost.images.standard_resolution.url ];
        }
        tmp.permalink = tmpPost.link;
        tmp.timestamp = new Date(parseInt(tmpPost.created_time) * 1000).toISOString(); // note: IG's timestamps are unix-style (seconds since epoch)
        normalizedPosts[ key ].instagram.posts[ i ] = tmp;
        if (tmp.postId > normalizedPosts[ key ].instagram.last.toString()) {
          normalizedPosts[ key ].instagram.last = tmp.postId;
        }
      }
    });

    return callback (null, normalizedPosts);
  }
}

module.exports = instagram;
