var should = require('should'),
    compiler = require('../lib/compiler.js')
    ;

var testData = require('./data/compilerData.js'),
    testPosts = testData.testPosts
    ;

describe('post compiler tests', function () {
  it('should merge posts from multiple networks into a single object', function (done) {
    compiler.merge(testPosts, function (err, mergedPosts) {
      mergedPosts.f5ln1svr7ff15y8t.last.twitter.should.eql('556548177747542017');
      mergedPosts.f5ln1svr7ff15y8t.posts.length.should.eql(2);
      done();
    })
  })
})