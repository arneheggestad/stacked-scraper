var facebook = {
  parseResponse: function (facebookResponse, callback) {
    var normalizedPosts = {};
    Object.keys(facebookResponse).forEach( function (key, index) {
      var data = facebookResponse[ key ].data;
      normalizedPosts[ key ] = {
        facebook: {
          posts: [],
          last: 0
        }
      };
      var last = 0;
      var length = data.length;
      for (var i = 0; i < length; i++) {
          var tmp = {};
          var tmpPost = data[ i ]; // reference to the post, for ease of typing
          tmp.postId = tmpPost.object_id;
          tmp.userId = key;
          tmp.source = {
            network: 'facebook',
            data: tmpPost
          };
          tmp.content = {
            text: tmpPost.message
          };
          if (tmpPost.picture) {
            tmp.content.picture = [ tmpPost.picture ];
          }
          tmp.permalink = tmpPost.actions[ 0 ].link; // get the permalink from the actions field
          tmp.timestamp = tmpPost.created_time; // fb's time stamps are in ISO-8601 format (yyyy-mm-ddThh:mm:ss+zone)
          normalizedPosts[ key ].facebook.posts[ i ] = tmp;
          if (parseInt(tmp.postId) > parseInt(last)) {
            last = tmp.postId;
          }
          normalizedPosts[ key ].facebook.last = last;
        }
    }, facebookResponse);
    return callback (null, normalizedPosts);
  },
  buildApiRequests: function (userObject, callback) {
    //
  }
}

module.exports = facebook;
