var should = require('should'),
    facebook = require('../lib/facebook.js')
    ;

var facebookData = require('./data/facebookData.js'),
    facebookUsers = facebookData.users,
    goodResponse = facebookData.goodResponse,
    testAuth = facebookData.testAuth
    ;

describe('facebook', function () {
  describe('parse a good response', function () {
    it('should return five posts', function (done) {
      facebook.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.facebook.posts.length.should.equal(5);
        done();
      })
    });
    it('should return the right permalink for post 4', function (done) {
      facebook.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.facebook.posts[3].permalink.should.eql('https://www.facebook.com/10106338419358611/posts/10106322302232461');
        done();
      })
    });
    it('should create the right timestamp for post 1', function (done) {
      facebook.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.facebook.posts[0].timestamp.should.eql('2015-01-20T21:14:04.000Z');
        done();
      })
    })
    it('should show that post 1 has an image', function (done) {
      facebook.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.facebook.posts[0].content.img[0].should.eql('https://scontent-b.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/s130x130/10487585_10106338579697291_4827880597232105485_n.jpg?oh=7635ecec7addc0865d48c8705ea9b488&oe=55644970');
        done();
      })
    })
    it('should update the \'last\' field correctly', function (done) {
      facebook.parseResponse(goodResponse, function (err, parsedPosts) {
        parsedPosts.foo.facebook.last.should.eql('10106338579697291');
        done();
      })
    })
  })

  // describe('generate valid oauth signature', function () {
  //   it('should generate an oauth signature', function (done) {
  //     facebook.generateSignature(testAuth, function (err, oauthData) {
  //       oauthData.hash.should.equal('tnnArxj06cWHq44gCs1OSKk/jLY=');
  //       done();
  //     })
  //   })
  // })

  // describe('make a nonce', function () {
  //   it('should generate a random value', function (done) {
  //     facebook.makeNonce(function (nonce) {
  //       done();
  //     })
  //   })
  // })

  // describe('generate oauth data for a particular user', function () {
  //   it('should generate valid oauth data', function (done) {
  //     var testUser = facebookData.singleUser;
  //     facebook.generateOauthData(testUser, function (err, signedOauthData) {
  //       signedOauthData.hash.should.exist;
  //       done();
  //     })
  //   })
  // })

  // describe('return normalized posts from a list of facebook users', function () {
  //   // take list of users and build facebook API requests
  //   it('should generate facebook API requests for a set of users', function (done) {
  //     facebook.buildApiRequests(facebookUsers, function (err, facebookRequests) {
  //       facebookRequests.cgf5gowgdz7kwkyb.tokenSecret.should.eql('QCfqI6poTyYpmcoCp1x7VFspBLqU5frkmHaO6unZDrjIS');
  //       facebookRequests.hrlot2b4g36qlsa2.consumerKey.should.eql('6NNBDyJ2TavL407A3lWxPFKBI');
  //       done();
  //     })
  //   })
  //   // make the requests to facebook
  //   it('make requests to facebook', function (done) {
  //     done();
  //   })
  //   // build object with normalized posts
  //   it('build object with normalized posts', function (done) {
  //     done();
  //   })
  //   // return object to compiler
  // })
})