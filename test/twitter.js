var should = require('should'),
    twitter = require('../lib/twitter.js')
    ;

var twitterData = require('./data/twitterData.js'),
    twitterUsers = twitterData.users,
    goodResponse = twitterData.goodResponse;

var testAuth = {
  // demo from https://dev.twitter.com/oauth/overview/creating-signatures
  url: 'https://api.twitter.com/1/statuses/update.json',
  method: 'POST',
  status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
  consumerKey: 'xvz1evFS4wEEPTGEFPHBog',
  consumerSecret: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
  nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
  timestamp: '1318622958',
  token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
  tokenSecret: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE'
}

describe('get tweets', function () {
  it('should get a user\'s recent tweets', function (done) {
    twitter.getPosts(twitterUsers, function (err, posts) {
      done();
    })
  })
})

describe('parse a good response', function () {
  it('should parse good returned data', function (done) {
    twitter.parseResponse(goodResponse, function (err, parsedPosts) {
      parsedPosts.foo.length.should.equal(5);
      parsedPosts.foo[3].content.text.should.equal('My morning excitement: bought some refreshments for a client meeting, then realized I could deduct them as a business expense. Hurray!');
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