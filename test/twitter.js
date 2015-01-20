var should = require('should'),
    twitter = require('../lib/twitter.js')
    ;

var twitterData = require('./data/twitterData.js'),
    twitterUsers = twitterData.users,
    goodResponse = twitterData.goodResponse,
    testAuth = twitterData.testAuth
    ;

describe('twitter', function () {
  describe('get tweets', function () {
    it('should get a user\'s recent tweets', function (done) {
      twitter.getPosts(twitterUsers, function (err, posts) {
        done();
      })
    })
  })

  describe('parse a good response', function () {
    it('should return five posts', function (done) {
      twitter.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts.length.should.equal(5);
        done();
      })
    });
    it('should return the right permalink for post 3', function (done) {
      twitter.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[2].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555732376815693824');
        done();
      })
    });
    it('should return the right permaline for post 5', function (done) {
      twitter.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555731518531055616');
        done();
      })
    });
    it('should return the right text content for post 5', function (done) {
      twitter.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].content.text.should.equal('My morning excitement: bought some refreshments for a client meeting, then realized I could deduct them as a business expense. Hurray!');
        done();
      })
    });
    it('should update the \'last\' field correctly', function (done) {
      twitter.parseResponse(goodResponse, function (err, parsedPosts) {
        // console.log(parsedPosts.foo.twitter.posts.length);
        // for (var i = 0; i < parsedPosts.foo.twitter.posts.length; i++) {
        //   console.log(parsedPosts.foo.twitter.posts[i].postId, parsedPosts.foo.twitter.posts[i].permalink);
        // }
        // console.log(parsedPosts.foo.twitter.last);
        parsedPosts.foo.twitter.last.should.eql('556912997680287744');
        done();
      })
    })
  })

  describe('generate valid oauth signature', function () {
    it('should generate an oauth signature', function (done) {
      twitter.generateSignature(testAuth, function (err, oauthData) {
        oauthData.hash.should.equal('tnnArxj06cWHq44gCs1OSKk/jLY=');
        done();
      })
    })
  })

  describe('make a nonce', function () {
    it('should generate a random value', function (done) {
      twitter.makeNonce(function (nonce) {
        done();
      })
    })
  })

  describe('generate oauth data for a particular user', function () {
    it('should generate valid oauth data', function (done) {
      var testUser = twitterData.singleUser;
      twitter.generateOauthData(testUser, function (err, signedOauthData) {
        signedOauthData.hash.should.exist;
        done();
      })
    })
  })

  describe('return normalized posts from a list of twitter users', function () {
    // take list of users and build twitter API requests
    it('should generate twitter API requests for a set of users', function (done) {
      twitter.buildApiRequests(twitterUsers, function (err, twitterRequests) {
        twitterRequests.cgf5gowgdz7kwkyb.tokenSecret.should.eql('QCfqI6poTyYpmcoCp1x7VFspBLqU5frkmHaO6unZDrjIS');
        twitterRequests.hrlot2b4g36qlsa2.consumerKey.should.eql('6NNBDyJ2TavL407A3lWxPFKBI');
        done();
      })
    })
    // make the requests to twitter
    it('make requests to twitter', function (done) {
    })
    // build object with normalized posts
    it('build object with normalized posts', function (done) {
    })
    // return object to compiler
  })
})