var should = require('should'),
    instagram = require('../lib/instagram.js');

var instagramData = require('./data/instagramData.js'),
    goodResponse = instagramData.goodResponse;

var secrets = require('./credentials/secrets.js'),
    instagramUser = {
      '54b592a9853862b8268e095f': secrets.instagramValid
    };

describe('instagram: ', function () {
  describe('raw posts: ', function () {
    it('get posts', function (done) {
      instagramUser['54b592a9853862b8268e095f'].last = '897227155268837889_436702183';
      instagram.getPosts(instagramUser, function (err, normalizedPosts) {
        if (err) { console.log(err); }
        console.log(normalizedPosts);
        done();
      })
    })
  }),
  describe('normalize posts: ', function () {
    it('should return an object with 5 posts', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.posts.length.should.eql(5);
        done();
      })
    })
    it('should get the right timestamp for post 3', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.posts[2].timestamp.should.eql('2014-12-26T21:44:26.000Z');
        done();
      })
    })
    it('should get the right id for post 2', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.posts[1].postId.should.eql('886713966802379071_436702183');
        done();
      })
    })
    it('should get the right text for post 4', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.posts[3].content.text.should.eql('Pit bulls and parolees!!!! #pitbull #villalobos #pitbullsandparolees');
        done();
      })
    })
    it('should get the right image url for post 1', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.posts[0].content.img[0].should.eql('http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/10903762_327676387435369_137182002_n.jpg');
        done();
      })
    })
    it('should update last correctly', function (done) {
      instagram.normalizePosts(goodResponse, function (err, normalizedPosts) {
        normalizedPosts.foo.instagram.last.should.eql('897227155268837889_436702183');
        done();
      })
    })
  })
})
