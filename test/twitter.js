var secrets = require('../credentials/secrets.js'),
    should = require('should'),
    twitter = require('../lib/twitter.js')(secrets)
    ;

var twitterData = require('./data/twitterData.js'),
    twitterUsers = twitterData.users,
    goodResponse = twitterData.goodResponse,
    testAuth = twitterData.testAuth,
    validUser = {
      '54b592a9853862b8268e095f': secrets.twitterValid}
    ;

describe('twitter: ', function () {
  describe('parse a good response', function () {
    it('should return six posts', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts.length.should.equal(6);
        done();
      })
    });
    it('should return the right permalink for post 3', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[2].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555732376815693824');
        done();
      })
    });
    it('should return the right permalink for post 5', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555731518531055616');
        done();
      })
    });
    it('should return the right text content for post 5', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].content.text.should.equal('My morning excitement: bought some refreshments for a client meeting, then realized I could deduct them as a business expense. Hurray!');
        done();
      })
    });
    it('should update the \'last\' field correctly', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.last.should.eql('557907759984021505');
        done();
      })
    })
    it('should handle the image in post 6', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[5].content.img[0].should.eql('http://pbs.twimg.com/media/B74WJtHIYAAsJVd.jpg');
        done();
      })
    })
    it('should add a timestamp', function (done) {
      twitter.normalizePosts(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[0].timestamp.should.eql('2015-01-18T20:36:20.000Z');
        done();
      })
    })
  })
  describe('using oauth: ', function () {
    it('should get 5 raw posts from @StackedSports', function (done) {
      validUser['54b592a9853862b8268e095f'].url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + validUser['54b592a9853862b8268e095f'].userId + '&count=5';
      twitter.doOauthQuery(validUser['54b592a9853862b8268e095f'], function (err, rawPosts) {
        rawPosts.length.should.eql(5);
        done();
      })
    });
    it('should return normalized posts from twitter', function (done) {
      twitter.getPosts(validUser, function (err, normalizedPosts) {
        console.log('live twitter posts retrieved: ' + normalizedPosts[ '54b592a9853862b8268e095f' ].twitter.posts.length);
        done();
      })
    })
  })
})