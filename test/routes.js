var should = require('should'),
    routes = require('../lib/routes.js')
    ;

var secret = require('../credentials/secret.js'),
    testUsers = {
      'foo': {
        twitter: secrets.twitterValid,
        instagram: secrets.instagramValid,
        facebook: secrets.facebookValid
      }
    }

describe('routes: ', function () {
  // ultimate test: give object with users and credentials to routes
  // receive object with users, normalized (sorted) posts, and updated `last` fields


})
