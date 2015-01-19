var crypto = require('crypto'),
    secrets = require('../credentials/secrets.js'),
    consumerKey = secrets.twitter.consumerKey,
    consumerSecret = secrets.twitter.consumerSecret,
    baseurl = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
    ;

var twitter = {
  getPosts: function (queriesObj, callback) {
    for (var ssUserId in queriesObj) {
      if (queriesObj.hasOwnProperty(ssUserId)) {
        console.log(ssUserId);
      }
    }
    return callback(null, null);
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
  generateSignature: function (oauthData, callback) {
    // for testing, allow the consumer key to be overridden
    if (oauthData.oauthConsumerKey) {
      consumerKey = oauthData.oauthConsumerKey;
    }
    if (oauthData.oauthConsumerSecret) {
      consumerSecret = oauthData.oauthConsumerSecret;
    }
    var parameterString = 'include_entities=true&oauth_consumer_key=' + consumerKey
                          + '&oauth_nonce=' + oauthData.oauthNonce
                          + '&oauth_signature_method=' + 'HMAC-SHA1'
                          + '&oauth_timestamp=' + oauthData.oauthTimestamp
                          + '&oauth_token=' + oauthData.oauthToken
                          + '&oauth_version=1.0'
                          + '&status=' + encodeURIComponent(oauthData.status).replace(/[!'()*]/g, function (c) {
                          // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
                              return '%' + c.charCodeAt(0).toString(16);
                            });
    var sigBaseString = oauthData.method + '&' + encodeURIComponent(oauthData.url)
                        + '&' + encodeURIComponent(parameterString);
    var signingKey = encodeURIComponent(consumerSecret) + '&' + encodeURIComponent(oauthData.oauthTokenSecret);
    // HMAC-SHA1 signing
    var hash = crypto.createHmac('sha1', signingKey).update(sigBaseString).digest('base64');
    oauthData.hash = hash;
    return callback (null, oauthData);
  }
}

var buildRequest = function (userId, callback) {
  var url = baseurl + '?screen_name=' + userId + ''
}

module.exports = twitter;
