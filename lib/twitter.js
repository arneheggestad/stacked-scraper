var crypto = require('crypto'),
    secrets = require('../credentials/secrets.js')
    ;

var twitter = {
  getPosts: function (queriesObj, callback) {
    for (var ssUserId in queriesObj) {
      if (queriesObj.hasOwnProperty(ssUserId)) {
        console.log(ssUserId);
      }
    }
    return callback (null, null);
  },
  parseResponse: function (twitterResponse, callback) {
    var normalizedPosts = {};
    for (var ssUserId in twitterResponse) {
      if (twitterResponse.hasOwnProperty(ssUserId)) {
        normalizedPosts[ ssUserId ] = [];
        var length = twitterResponse[ ssUserId ].length;
        var tmp = {};
        for (var i = 0; i < length; i++) {
          var tmpPost = twitterResponse[ ssUserId ][ i ];
          tmp.postId = '';
          tmp.userId = ssUserId;
          tmp.source = {
            network: 'twitter',
            data: tmpPost
          };
          tmp.content = {
            text: tmpPost.text
          };
          tmp.permalink = 'https://twitter.com/' + tmpPost.user.screen_name + '/status/' + tmpPost.id_str;
          normalizedPosts[ ssUserId ].push(tmp);
        }
      }
    }
    return callback (null, normalizedPosts);
  },
  generateOauthData: function (user, callback) {
    var oauthData = {};
    oauthData.method = 'GET';
    oauthData.url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    oauthData.consumerKey = secrets.twitter.consumerKey;
    oauthData.consumerSecret = secrets.twitter.consumerSecret;
    oauthData.timestamp = Math.floor(Date.now() / 1000); // oauth timestamp is in seconds since epoch, not ms
    oauthData.token = user.token; // user access token
    oauthData.tokenSecret = user.tokenSecret; // user access token secret
    twitter.makeNonce( function (nonce) {
      oauthData.nonce = nonce;
      twitter.generateSignature (oauthData, function (err, signedOauthData) {
        return callback (null, signedOauthData);
      })
    });
  },
  generateSignature: function (oauthData, callback) {
    var parameterString = 'include_entities=true&oauth_consumer_key=' + oauthData.consumerKey
                          + '&oauth_nonce=' + oauthData.nonce
                          + '&oauth_signature_method=' + 'HMAC-SHA1'
                          + '&oauth_timestamp=' + oauthData.timestamp
                          + '&oauth_token=' + oauthData.token
                          + '&oauth_version=1.0';
    if (oauthData.status) {
      parameterString += '&status=' + encodeURIComponent(oauthData.status).replace(/[!'()*]/g, function (c) {
                          // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
                              return '%' + c.charCodeAt(0).toString(16);
                            });
    }
    var sigBaseString = oauthData.method + '&' + encodeURIComponent(oauthData.url)
                        + '&' + encodeURIComponent(parameterString);
    var signingKey = encodeURIComponent(oauthData.consumerSecret) + '&' + encodeURIComponent(oauthData.tokenSecret);
    // HMAC-SHA1 signing
    var hash = crypto.createHmac('sha1', signingKey).update(sigBaseString).digest('base64');
    oauthData.hash = hash;
    return callback (null, oauthData);
  },
  makeNonce: function (callback) {
    var nonce = crypto.randomBytes(32).toString('base64');
    nonce = nonce.replace(/\W/g, '')
    return callback (nonce);
  }
}

var buildRequest = function (userId, callback) {
  // ...
}

module.exports = twitter;
