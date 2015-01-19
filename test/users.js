var should = require('should'),
    users = require('../lib/users.js')
    ;

var testUsers = require('./data/testUsers.js');

describe('should parse list of users to be scraped into network-specific objects', function () {
  it('should find 9 facebook users', function (done) {
    users.parseUsers(testUsers, function (err, queriesObj) {
      queriesObj.facebook.length.should.eql(9);
      done();
    })    
  });
  it('should return an error for an unidentified network', function (done) {
    var badUser = {'baduser': {'badnetwork': {'userId': 'foo', 'token': 'bar'}}};
    users.parseUsers(badUser, function (err, queriesObj) {
      err.should.exist;
      done();
    })
  })
})
