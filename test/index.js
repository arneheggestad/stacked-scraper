var should = require('should'),
    secrets = require('./credentials/secrets.js'),
    index = require('../index.js')(secrets)
    ;

var testUsers = {
      'beau': {
        twitter: secrets.twitterValid,
        instagram: secrets.instagramValid
      }
    };

// describe('index: ', function () {
//   // ultimate test: give object with users and credentials to routes
//   // receive object with users, normalized (sorted) posts, and updated `last` fields
//   index(testUsers, secrets, function (err, collatedPosts) {
//     var posts = collatedPosts[ '54b592a9853862b8268e095f' ].posts;
//     // for (var i = 0; i < posts.length; i++) {
//     //   console.log(posts[i].timestamp);
//     // }
//     it('should return posts in descending timestamp order', function (done) {
//       (posts[0].timestamp > posts[3].timestamp).should.eql(true);
//       done();
//     })
//   })
// })
describe('index: ', function () {
  it('should handle receiving a null network object', function (done) {
    index(testUsers, function (err, collatedPosts) {
      console.log(collatedPosts);
      done();
    })
  })
})