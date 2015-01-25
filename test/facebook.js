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
    }

describe('facebook: ', function () {
  // describe('parse a good response', function () {
  //   it('should return five posts', function (done) {
  //     facebook.normalizePosts(goodResponse, function (err, parsedPosts) {
  //       parsedPosts.foo.facebook.posts.length.should.equal(5);
  //       done();
  //     })
  //   });
  //   it('should return the right permalink for post 4', function (done) {
  //     facebook.normalizePosts(goodResponse, function (err, parsedPosts) {
  //       parsedPosts.foo.facebook.posts[3].permalink.should.eql('https://www.facebook.com/10106338419358611/posts/10106322302232461');
  //       done();
  //     })
  //   });
  //   it('should create the right timestamp for post 1', function (done) {
  //     facebook.normalizePosts(goodResponse, function (err, parsedPosts) {
  //       parsedPosts.foo.facebook.posts[0].timestamp.should.eql('2015-01-20T21:14:04.000Z');
  //       done();
  //     })
  //   })
  //   it('should show that post 1 has an image', function (done) {
  //     facebook.normalizePosts(goodResponse, function (err, parsedPosts) {
  //       parsedPosts.foo.facebook.posts[0].content.img[0].should.eql('https://scontent-b.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/s130x130/10487585_10106338579697291_4827880597232105485_n.jpg?oh=7635ecec7addc0865d48c8705ea9b488&oe=55644970');
  //       done();
  //     })
  //   })
  //   it('should update the \'last\' field correctly', function (done) {
  //     facebook.normalizePosts(goodResponse, function (err, parsedPosts) {
  //       parsedPosts.foo.facebook.last.should.eql('10106338579697291');
  //       done();
  //     })
  //   })
  // })
  describe('get posts', function () {
    it('should get posts for Beau', function (done) {
      facebook.getPosts(validUser, function (err, normalizedPosts) {
        console.log(normalizedPosts[ '54b7149858b9aeb81f14fb04' ].facebook);
        done();
      })
    })
  })
})
