var crypto = require('crypto'),
    http = require('http'),
    OAuth = require('oauth'),
    async = require('async'),
    secrets = require('../credentials/secrets.js')
    ;

var methods = {
  parseResponses: function (twitterResponses, callback) {
    var normalizedPosts = {};
    for (var ssUserId in twitterResponses) {
      if (twitterResponses.hasOwnProperty(ssUserId)) {
        normalizedPosts[ ssUserId ] = {
          twitter: {
            posts: [],
            last: 0
          }
        }
        var last = 0;
        var length = twitterResponses[ ssUserId ].length;
        for (var i = 0; i < length; i++) {
          var tmp = {};
          var tmpPost = twitterResponses[ ssUserId ][ i ];
          tmp.postId = tmpPost.id_str;
          tmp.userId = ssUserId;
          tmp.source = {
            network: 'twitter',
            data: tmpPost
          };
          tmp.content = {
            text: tmpPost.text
          };
          if (tmpPost.entities.media) {
            tmp.content.img = [];
            for (var j = 0; j < tmpPost.entities.media.length; j++) {
              tmp.content.img.push(tmpPost.entities.media[ j ].media_url);
            }
          }
          tmp.timestamp = new Date(Date.parse(tmpPost.created_at)).toISOString();
          tmp.permalink = 'https://twitter.com/' + tmpPost.user.screen_name + '/status/' + tmpPost.id_str;
          normalizedPosts[ ssUserId ].twitter.posts[ i ] = tmp;
          if (parseInt(tmp.postId) > parseInt(last)) {
            last = tmp.postId;
          }
          normalizedPosts[ ssUserId ].twitter.last = last;
        }
      }
    }
    return callback (null, normalizedPosts);
  },
  // generateOauthData: function (user, callback) {
  //   var oauthData = {};
  //   oauthData.method = 'GET';
  //   oauthData.url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  //   // if we have a userId (screen name), add it to the url
  //   if (user.userId) {
  //     oauthData.url += '&screen_name=' + user.userId;
  //   }
  //   // if we have a 'last' field, add it to the url
  //   if (user.last) {
  //     oauthData.url += '&since=' + user.last;
  //   }
  //   oauthData.consumerKey = secrets.twitter.consumerKey;
  //   oauthData.consumerSecret = secrets.twitter.consumerSecret;
  //   oauthData.timestamp = Math.floor(Date.now() / 1000); // oauth timestamp is in seconds since epoch, not ms
  //   oauthData.token = user.token; // user access token
  //   oauthData.tokenSecret = user.tokenSecret; // user access token secret
  //   twitter.makeNonce( function (nonce) {
  //     oauthData.nonce = nonce;
  //     twitter.generateSignature (oauthData, function (err, signedOauthData) {
  //       return callback (null, signedOauthData);
  //     })
  //   });
  // },
  // generateSignature: function (oauthData, callback) {
  //   var parameterString = 'include_entities=true&oauth_consumer_key=' + oauthData.consumerKey
  //                         + '&oauth_nonce=' + oauthData.nonce
  //                         + '&oauth_signature_method=' + 'HMAC-SHA1'
  //                         + '&oauth_timestamp=' + oauthData.timestamp
  //                         + '&oauth_token=' + oauthData.token
  //                         + '&oauth_version=1.0';
  //   if (oauthData.status) {
  //     parameterString += '&status=' + encodeURIComponent(oauthData.status).replace(/[!'()*]/g, function (c) {
  //                         // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  //                             return '%' + c.charCodeAt(0).toString(16);
  //                           });
  //   }
  //   var sigBaseString = oauthData.method + '&' + encodeURIComponent(oauthData.url)
  //                       + '&' + encodeURIComponent(parameterString);
  //   var signingKey = encodeURIComponent(oauthData.consumerSecret) + '&' + encodeURIComponent(oauthData.tokenSecret);
  //   // HMAC-SHA1 signing
  //   var hash = crypto.createHmac('sha1', signingKey).update(sigBaseString).digest('base64');
  //   oauthData.hash = hash;
  //   return callback (null, oauthData);
  // },
  // makeNonce: function (callback) {
  //   var nonce = crypto.randomBytes(32).toString('base64');
  //   nonce = nonce.replace(/\W/g, '')
  //   return callback (nonce);
  // },
  // buildApiRequests: function (userObject, callback) {
  //   var twitterRequests = {};
  //   for (var ssUserId in userObject) {
  //     if (userObject.hasOwnProperty(ssUserId)) {
  //       var user = userObject[ ssUserId ];
  //       twitter.generateOauthData(user, function (err, signedOauthData) {
  //         twitterRequests[ ssUserId ] = signedOauthData;
  //       })
  //     }
  //   }
  //   return callback (null, twitterRequests);
  // },
  // doQuery: function (twitterRequests, callback) {
  //   var responses = {};
  //   for (var ssUserId in twitterRequests) {
  //     if (twitterRequests.hasOwnProperty(ssUserId)) {
  //       responses[ ssUserId ] = [];
  //       var userReq = twitterRequests[ ssUserId ];
  //       // console.log(userReq);
  //       var urlParser = new RegExp('(http|https)(\:\/\/)(api.twitter.com)(.*)');
  //       var options = {
  //         hostname: userReq.url.replace(urlParser, '$3'),
  //         path: userReq.url.replace(urlParser, '$4'),
  //         method: userReq.method
  //       };
  //       if (userReq.url.replace(urlParser, '$1') === 'https') {
  //         options.port = 443;
  //       } else {
  //         options.port = 80;
  //       }
  //       var authHeaders = {
  //         Authorization: 'OAuth',
  //         oauth_consumer_key: userReq.consumerKey,
  //         oauth_nonce: userReq.nonce,
  //         oauth_signature: userReq.hash,
  //         oauth_signature_method: 'HMAC-SHA1',
  //         oauth_timestamp: userReq.timestamp,
  //         oauth_token: userReq.token,
  //         oauth_version: '1.0'
  //       }
  //       options.headers = authHeaders;
  //       // console.log(options);
  //       http.get(options, function (res) {
  //         // console.log(options.path);
  //         // console.log('STATUS: ' + res.statusCode);
  //         res.setEncoding('utf8');
  //         res.on('data', function (chunk) {
  //           responses[ ssUserId ].push(chunk);
  //         })
  //       }).on('error', function (e) {
  //         console.log('Error! ' + e);
  //         return callback (e);
  //       });
  //     }
  //   }
  //   return callback (null, responses);
  // },
  doOauthQuery: function (user, callback) {
    // get posts via the oauth npm package
    var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      secrets.twitter.consumerKey, // consumer key
      secrets.twitter.consumerSecret, // consumer secret
      '1.0A',
      null,
      'HMAC-SHA1'
      );
    // console.log(user);
    // console.log(user.userToken, user.userTokenSecret);
    oauth.get(
      user.url, // url
      user.accessToken, // user token
      user.tokenSecret, // user secret
      // undefined,
      // undefined,
      function (e, data, res) {
        if (e) {
          return callback (e);
        }
        if (data && res.statusCode === 200) {
          return callback (null, JSON.parse(data));
        }
      });
  },
  getPosts: function (twitterUsers, callback) {
    var twResponses = {},
        users = Object.keys(twitterUsers); // makes an array of the user IDs for async to iterate over
    async.each(users, function (userId, asyncCallback) {
      var user = twitterUsers[ userId ];
      // build the url
      user.url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?';
      if (user.userId) {
        user.url += 'user_id=' + user.userId;
      } else if (user.screenName) {
        user.url += 'screen_name=' + user.screenName;
      }
      if (user.last) {
        user.url += '&since_id=' + user.last;
      }
      console.log(user);
      // pass the user object (with id, token, secret, and url) to oauth
      methods.doOauthQuery (user, function (err, pageData) {
        if (err) { console.log('error: ' + err); }
        // console.log(userId, ': found posts');
        twResponses[ userId ] = pageData;
        asyncCallback ();
      });
    }, function (err) {
      // asyncCallback()
      if (err) {
        console.log (err);
      } else {
        return callback (null, twResponses);
      }
    });
  }
}

var buildRequest = function (userId, callback) {
  // ...
}

module.exports = methods;
