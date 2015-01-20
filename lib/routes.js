// dependencies
var async = require('async'),
    users = require('./users.js'),
    twitter = require('./twitter.js')
    ;

var routes = function (userObj) {
  // GENERAL FLOW
  // take userObj, which contains Stacked Sports User IDs and associated networks and token
  // reconfigure userObj by network
  // pass appropriate reconfigured userObj to each network
  // receive normalized posts from each network
  // compile all posts into final object by ssUserId
  // return compiled final object
}

module.export = routes;
