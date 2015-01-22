var should = require('should'),
    routes = require('../lib/routes.js')
    ;

var secrets = require('../credentials/secrets.js'),
    testUsers = {
      '54b592a9853862b8268e095f': {
        twitter: secrets.twitterValid,
        instagram: secrets.instagramValid
      },
      '54b7149858b9aeb81f14fb04': {
        facebook: secrets.facebookValid
      }
    };



describe('routes: ', function () {
  // ultimate test: give object with users and credentials to routes
  // receive object with users, normalized (sorted) posts, and updated `last` fields
  it('should get posts for our valid user set', function (done) {
    routes(testUsers, function (err, collatedPosts) {
      var posts = collatedPosts[ '54b592a9853862b8268e095f' ].posts;
      for (var i = 0; i < posts.length; i++) {
        console.log(posts[i].timestamp);
      }
      done();
    })
  })
})
