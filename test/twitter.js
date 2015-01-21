var should = require('should'),
    twitter = require('../lib/twitter.js')
    ;

var twitterData = require('./data/twitterData.js'),
    twitterUsers = twitterData.users,
    goodResponse = twitterData.goodResponse,
    testAuth = twitterData.testAuth
    ;

var secrets = require('../credentials/secrets.js'),
    validUser = {
      '54b592a9853862b8268e095f': secrets.twitterValid};

describe('twitter: ', function () {
  describe('parse a good response', function () {
    it('should return six posts', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts.length.should.equal(6);
        done();
      })
    });
    it('should return the right permalink for post 3', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[2].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555732376815693824');
        done();
      })
    });
    it('should return the right permaline for post 5', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].permalink.should.equal('https://twitter.com/ArneHeggestad/status/555731518531055616');
        done();
      })
    });
    it('should return the right text content for post 5', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[4].content.text.should.equal('My morning excitement: bought some refreshments for a client meeting, then realized I could deduct them as a business expense. Hurray!');
        done();
      })
    });
    it('should update the \'last\' field correctly', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.last.should.eql('557907759984021505');
        done();
      })
    })
    it('should handle the image in post 6', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[5].content.img[0].should.eql('http://pbs.twimg.com/media/B74WJtHIYAAsJVd.jpg');
        done();
      })
    })
    it('should add a timestamp', function (done) {
      twitter.parseResponses(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.twitter.posts[0].timestamp.should.eql('2015-01-18T20:36:20.000Z');
        done();
      })
    })
  })

  // describe('generate valid oauth signature', function () {
  //   it('should generate an oauth signature', function (done) {
  //     twitter.generateSignature(testAuth, function (err, oauthData) {
  //       oauthData.hash.should.equal('tnnArxj06cWHq44gCs1OSKk/jLY=');
  //       done();
  //     })
  //   })
  // })

  // describe('make a nonce', function () {
  //   it('should generate a random value', function (done) {
  //     twitter.makeNonce(function (nonce) {
  //       done();
  //     })
  //   })
  // })

  // describe('generate oauth data for a particular user', function () {
  //   it('should generate valid oauth data', function (done) {
  //     var testUser = twitterData.singleUser;
  //     twitter.generateOauthData(testUser, function (err, signedOauthData) {
  //       signedOauthData.hash.should.exist;
  //       done();
  //     })
  //   })
  // })
  // describe('normalized posts: ', function () {
  //   // take list of users and build twitter API requests
  //   it('should generate twitter API requests for a set of users', function (done) {
  //     twitter.buildApiRequests(twitterUsers, function (err, twitterRequests) {
  //       twitterRequests.cgf5gowgdz7kwkyb.tokenSecret.should.eql('QCfqI6poTyYpmcoCp1x7VFspBLqU5frkmHaO6unZDrjIS');
  //       twitterRequests.hrlot2b4g36qlsa2.consumerKey.should.eql('6NNBDyJ2TavL407A3lWxPFKBI');
  //       done();
  //     })
  //   })
    // make the requests to twitter
    // it('make requests to twitter', function (done) {
    //   twitter.buildApiRequests(twitterUsers, function (err, twitterRequests) {
    //     twitter.doQuery(twitterRequests, function (err, twitterResponses) {
    //       if (err) { console.log(err); }
    //       if (twitterResponses) { console.log(twitterResponses); }
    //       done();
    //     })
    //   })
    // })
    // build object with normalized posts
    // it('build object with normalized posts', function (done) {
    //   done();
    // })
    // return object to compiler
  // })
  describe('using oauth: ', function () {
    it('should get 5 raw posts', function (done) {
      validUser['54b592a9853862b8268e095f'].url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + validUser['54b592a9853862b8268e095f'].userId + '&count=5';
      twitter.doOauthQuery(validUser['54b592a9853862b8268e095f'], function (err, rawPosts) {
        if (err) { console.log(err); }
        rawPosts.length.should.eql(5);
        done();
      })
    })
  })
  it('should return normalized posts from twitter', function (done) {
    twitter.getPosts(validUser, function (err, normalizedPosts) {
      console.log(normalizedPosts);
      done();
    })
  })
})