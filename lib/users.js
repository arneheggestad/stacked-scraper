// dependencies

var users = {
  parseUsers: function (userObj, callback) {
    var queriesObj = {
      facebook: [],
      twitter: [],
      instagram: []
    };
    for (var ssuserID in userObj) {
      if (userObj.hasOwnProperty(ssuserID)) {
        // console.log(userID);
        // console.log(userObj[ssuserID])
        for (var network in userObj[ssuserID]) {
          if (userObj[ssuserID].hasOwnProperty(network)) {
            console.log(network, userObj[ssuserID][network]);
            var tmp = [ssuserID, userObj[ssuserID][network].userId, userObj[ssuserID][network].token];
            // console.log(tmp);
            if (network === 'facebook') {
              queriesObj.facebook.push(tmp);
            }
          }
        }
      }
    }
    return callback (null, queriesObj);
  }
}

module.exports = users;