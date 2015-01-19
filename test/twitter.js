var should = require('should'),
    twitter = require('../lib/twitter.js')
    ;

define('get tweets', function () {
  it('should get a user\'s recent tweets', function (done) {
    twitter.getPosts(twitterUsers, function (err, posts) {
      done();
    })
  })
})