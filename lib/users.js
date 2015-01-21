// dependencies

var users = {
  parseUsers: function (userObj, callback) {
    var queriesObj = {};
    for (var ssUserId in userObj) {
      if (userObj.hasOwnProperty(ssUserId)) {
        for (var network in userObj[ ssUserId ]) {
          if (userObj[ ssUserId ].hasOwnProperty(network)) {
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
          }
        }
      }
    }
    return callback (null, queriesObj);
  }
}

module.exports = users;
