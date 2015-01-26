var async = require('async'),
    https = require('https');

var facebook = {
  getPosts: function (fbUsers, callback) {
    var fbResponses = {};
    var userIds = Object.keys(fbUsers);
    async.each(userIds,
      function (userId, asyncCallback) {
        var user = fbUsers[ userId ];
        user.url = '/v2.2/me/feed?access_token=' + user.accessToken;
        if (user.last) {
          user.url += '&since=' + user.last;
        }
        // console.log(user.url);
        var options = {
          host: 'graph.facebook.com',
          path: user.url,
          method: 'GET'
        }
        var temp = '';
        var req = https.request(options, function (res) {
          // console.log('STATUS: ' + res.statusCode);
          // console.log('HEADERS: ' + JSON.stringify(res.headers));
          var pageData = '';
          res.setEncoding('utf-8');
          res.on('data', function (chunk) {
            // console.log('DATA: ' + chunk);
            pageData += chunk;
          });
          res.on('end', function () {
            var tempResponse = JSON.parse(pageData);
            fbResponses[ userId ] = tempResponse;
            asyncCallback();
          });
        });
        req.on('error', function (e) {
          var connErr = new RegExp('(ECONN|ENOT)'); // these are connection errors; should be returned to caller
          if (JSON.stringify(e).search(connErr !== -1)) {
            asyncCallback(e);
          } else {
            fbResponses[ userId ] = e;
            asyncCallback();
          }
        });
        req.end();
    },
      function (err) {
        // async callback
        if (err) {
          return callback(err);
        } else {
          // return callback (null, fbResponses);
          facebook.normalizePosts (fbResponses, function (err, normalizedPosts) {
            return callback (null, normalizedPosts);
          })
        }
    });
  },
  normalizePosts: function (facebookResponse, callback) {
    var normalizedPosts = {};
    Object.keys(facebookResponse).forEach( function (key, index) {
      var data = facebookResponse[ key ].data;
      normalizedPosts[ key ] = {
        facebook: {
          posts: [],
          last: 0
        }
      };
      if (facebookResponse[ key ].error) {
        normalizedPosts[ key ].facebook.oauthIssue = facebookResponse[ key ].error;
      } else {
        var last = 0;
        var length = data.length;
        for (var i = 0; i < length; i++) {
          var tmp = {};
          var tmpPost = data[ i ]; // reference to the post, for ease of typing
          tmp.postId = tmpPost.id;
          tmp.userId = key;
          tmp.source = {
            network: 'facebook',
            data: tmpPost
          };
          tmp.content = {
            text: tmpPost.message
          };
          if (tmpPost.picture) {
            tmp.content.img = [ tmpPost.picture ];
          }
          if (tmpPost.actions) {
            tmp.permalink = tmpPost.actions[ 0 ].link; // get the permalink from the actions field
          }
          tmp.timestamp = new Date(Date.parse(tmpPost.created_time)).toISOString();
          normalizedPosts[ key ].facebook.posts[ i ] = tmp;
          var tmpTime = Date.parse(tmpPost.created_time) / 1000;
          if (tmpTime > last) {
            last = tmpTime;
          }
          normalizedPosts[ key ].facebook.last = last;
        }
      }

    }, facebookResponse);
    return callback (null, normalizedPosts);
  }
}

module.exports = facebook;
