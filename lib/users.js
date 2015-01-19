// dependencies

var users = {
  parseUsers: function (userObj, callback) {
    var queriesObj = {};
    for (var ssUserId in userObj) {
      if (userObj.hasOwnProperty(ssUserId)) {
        for (var network in userObj[ ssUserId ]) {
          if (userObj[ ssUserId ].hasOwnProperty(network)) {
            if (!queriesObj[ network ]) {
              queriesObj[ network ] = [];
            }
            var tmp = {
              ssUserId: ssUserId,
              last: userObj[ ssUserId ][ network ].last,
              userId: userObj[ ssUserId ][ network ].userId,
              token: userObj[ ssUserId ][ network ].token
            }
            // console.log(tmp);
            queriesObj[ network ].push(tmp);
          }
        }
      }
    }
    return callback (null, queriesObj);
  }
}

module.exports = users;
