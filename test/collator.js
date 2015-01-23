var should = require('should'),
    collator = require('../lib/collator.js')
    ;

var testData = require('./data/collatorData.js'),
    testPosts = testData.testPosts,
    unsortedPosts = testData.unsortedPosts,
    validUsers = testData.users
    ;

describe('post collator tests', function () {
  it('should merge posts from multiple networks into a single object', function (done) {
    collator.merge(testPosts, function (err, mergedPosts) {
      mergedPosts[ 'f5ln1svr7ff15y8t' ].last.twitter.should.eql('556548177747542017');
      mergedPosts.f5ln1svr7ff15y8t.posts.length.should.eql(2);
      done();
    })
  })
  it('should sort posts by timestamp', function (done) {
    collator.sort(unsortedPosts, function (err, sortedPosts) {
      sortedPosts.foo.posts[1].content.text.should.eql('Second post');
      done();
    })
  })
})
