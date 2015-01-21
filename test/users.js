var should = require('should'),
    users = require('../lib/users.js')
    ;

var testUsers = require('./data/testUsers.js');

describe('separate master user object into network-specific objects: ', function () {
  it('should find 9 facebook users', function (done) {
    users.parseUsers(testUsers, function (err, queriesObj) {
	    var fbUsers = Object.keys(queriesObj.facebook);
	    fbUsers.length.should.eql(9);
      done();
    })    
  });
	it('should find 5 instagram users', function (done) {
    users.parseUsers(testUsers, function (err, queriesObj) {
	    var igUsers = Object.keys(queriesObj.instagram);
	    igUsers.length.should.eql(5);
      done();
    })    
  });
	it('should find 8 twitter users', function (done) {
    users.parseUsers(testUsers, function (err, queriesObj) {
	    var twUsers = Object.keys(queriesObj.twitter);
	    twUsers.length.should.eql(8);
      done();
    })    
  });
})
