// dependencies

var users = {
  parseUsers: function (userObj, callback) {
    try {
      var queriesObj = {};
      var userIds = Object.keys(userObj);
      userIds.forEach(function (ssUserId) {
        var networks = Object.keys(userObj[ ssUserId ]);
        networks.forEach(function (network) {
          if (!queriesObj[ network ]) {
            queriesObj[ network ] = {};
          }
          var tmp = {
            userId: userObj[ ssUserId ][ network ].userId,
            accessToken: userObj[ ssUserId ][ network ].accessToken
          }
          if (userObj[ ssUserId ][ network ].tokenSecret) {
            tmp.tokenSecret = userObj[ ssUserId ][ network ].tokenSecret
          }
          if (userObj[ ssUserId ][ network ].last) {
            tmp.last = userObj[ ssUserId ][ network ].last
          }
          // console.log(tmp);
          queriesObj[ network ][ ssUserId ] = (tmp);
        })
      })
      return callback (null, queriesObj);      
    }
    catch (e) {
      return callback (e);
    }

  }
}

module.exports = users;
