// dependencies

var users = {
  parseUsers: function (userObj, callback) {
    var queriesObj = {
      facebook: [],
      twitter: [],
      instagram: []
    };
    for (var ssUserId in userObj) {
      if (userObj.hasOwnProperty(ssUserId)) {
        for (var network in userObj[ ssUserId ]) {
          if (userObj[ ssUserId ].hasOwnProperty(network)) {
            var tmp = {
              ssUserId: ssUserId,
              userId: userObj[ ssUserId ][ network ].userId,
              token: userObj[ ssUserId ][ network ].token
            }
            // console.log(tmp);
            switch (network) {
              case 'facebook':
                queriesObj.facebook.push(tmp);
                break;
              case 'twitter':
                queriesObj.twitter.push(tmp);
                break;
              case 'instagram':
                queriesObj.instagram.push(tmp);
                break;
              default:
                return callback('Unknown network for user ' + ssUserId + ': ' + network);
            }
          }
        }
      }
    }
    return callback (null, queriesObj);
  }
}

module.exports = users;
