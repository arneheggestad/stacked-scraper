var should = require('should'),
    twitter = require('../lib/twitter.js')
    ;

var twitterData = require('./data/twitterData.js'),
    twitterUsers = twitterData.users,
    goodResponse = twitterData.goodResponse;

describe('get tweets', function () {
  it('should get a user\'s recent tweets', function (done) {
    twitter.getPosts(twitterUsers, function (err, posts) {
      done();
    })
  })
})

describe('parse a good response', function () {
  it('should parse good returned data', function (done) {
    twitter.parseResponse(goodResponse, function (err, parsedPosts) {
      console.log(parsedPosts);
      done();
    })
  })
})