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
    // it('should return the right permalink for post 3', function (done) {
    //   facebook.parseResponse(goodResponse, function (err, parsedPosts) {
    //     parsedPosts.foo.facebook.posts[2].permalink.should.equal('https://facebook.com/ArneHeggestad/status/555732376815693824');
    //     done();
    //   })
    // });
    // it('should return the right permaline for post 5', function (done) {
    //   facebook.parseResponse(goodResponse, function (err, parsedPosts) {
    //     parsedPosts.foo.facebook.posts[4].permalink.should.equal('https://facebook.com/ArneHeggestad/status/555731518531055616');
    //     done();
    //   })
    // });
    // it('should return the right text content for post 5', function (done) {
    //   facebook.parseResponse(goodResponse, function (err, parsedPosts) {
    //     parsedPosts.foo.facebook.posts[4].content.text.should.equal('My morning excitement: bought some refreshments for a client meeting, then realized I could deduct them as a business expense. Hurray!');
    //     done();
    //   })
    // });
    // it('should update the \'last\' field correctly', function (done) {
    //   facebook.parseResponse(goodResponse, function (err, parsedPosts) {
    //     // console.log(parsedPosts.foo.facebook.posts.length);
    //     // for (var i = 0; i < parsedPosts.foo.facebook.posts.length; i++) {
    //     //   console.log(parsedPosts.foo.facebook.posts[i].postId, parsedPosts.foo.facebook.posts[i].permalink);
    //     // }
    //     // console.log(parsedPosts.foo.facebook.last);
    //     parsedPosts.foo.facebook.last.should.eql('556912997680287744');
    //     done();
    //   })
    // })
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