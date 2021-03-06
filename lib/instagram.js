var https = require('https'),
    async = require('async')
    ;

var instagram = {
  // get raw data
  getPosts: function (igUsers, callback) {
    var igResponses = {};
    var userIds = Object.keys(igUsers);
    async.each(userIds,
      function (userId, asyncCallback) {
        var user = igUsers[ userId ];
        user.url = '/v1/users/' + user.userId + '/media/recent/?access_token=' + user.accessToken;
        if (user.last) {
          user.url += '&min_id=' + user.last;
        }
        // console.log(user.url);
        var options = {
          host: 'api.instagram.com',
          path: user.url
        }
        var temp = '';
        // console.log('https://' + options.host + options.path);
        var req = https.request(options, function (res) {
          // console.log('Got response: ' + res.statusCode);
          var pageData = '';
          res.setEncoding('utf-8');
          res.on('data', function (chunk) {
            pageData += chunk;
          });
          res.on('end', function () {
            igResponses[ userId ] = JSON.parse(pageData);
            if (user.last) {
              igResponses[ userId ].data.pop();
            }
            asyncCallback();
          })
        });
        req.on('error', function (e) {
          var connErr = new RegExp('(ECONN|ENOT)'); // connection errors
          if (JSON.stringify(e).search(connErr !== -1)) {
            asyncCallback(e);
          } else {
            igResponses[ userId ] = e;
            asyncCallback();
          }
        });
        req.end();
      },
      function (err) {
        // async callback
        if (err) {
          // connection error
          var igError = { // wrap the error in an object identifying the network
            instagram: err
          }
          return callback (igError);
        } else {
          // callback (null, igResponses);
          instagram.normalizePosts (igResponses, function (err, normalizedPosts) {
            return callback (null, normalizedPosts);
          })
        }
      });

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
      if (igResponses[ key ].error) {
        normalizedPosts[ key ].instagram.oauthIssue = igResponses[ key ].error;
      } else {
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
            text: tmpPost.caption ? tmpPost.caption.text : undefined
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
      }
    });

    return callback (null, normalizedPosts);
  }
}

module.exports = instagram;
