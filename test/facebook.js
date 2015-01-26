var should = require('should'),
    facebook = require('../lib/facebook.js')
    ;

var facebookData = require('./data/facebookData.js'),
    facebookUsers = facebookData.users,
    goodResponse = facebookData.goodResponse,
    testAuth = facebookData.testAuth
    ;

var secrets = require('./credentials/secrets.js'),
    validUser = {
      '54b7149858b9aeb81f14fb04': secrets.facebookValid
    },
    invalidUser = {
      'bad': secrets.facebookInvalid
    }

describe('facebook: ', function () {
  describe('get posts', function () {
    it('should get posts for Beau', function (done) {
      facebook.getPosts(validUser, function (err, normalizedPosts) {
        console.log(normalizedPosts[ '54b7149858b9aeb81f14fb04' ].facebook);
        done();
      })
    })
  })
  describe('oauth problem', function () {
    it('should return an oauth issue', function (done) {
      facebook.getPosts(invalidUser, function (err, normalizedPosts) {
        console.log(err);
        console.log(normalizedPosts);
        done();
      })
    })
  })
})
