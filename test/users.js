var should = require('should'),
    users = require('../lib/users.js')
    ;

var testUsers = require('./data/testUsers.js');

describe('should parse list of users to be scraped into network-specific objects', function (done) {
  users.parseUsers(testUsers, function (err, queriesObj) {
    queriesObj.should.exist;
    done();
  })
})
