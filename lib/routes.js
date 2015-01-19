// dependencies
var users = require('./users.js')
    ;

var routes = function (userObj) {
  users.parseUsers(userObj, function (err, queriesObj) {
    if (err) { throw (err); }
    // pass facebook user IDs to facebook module
    // pass twitter user IDs to twitter module
    // pass instagram user IDs to instagram module

  })
}

module.export = routes;
