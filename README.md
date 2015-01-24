# stackedSports-scraper
Social network API scraper for Stacked Sports

# Tests
Clone this repo, and run `npm install`. To succesfully run the tests, you will need a `tests/credentials/secrets.js` file with valid API credentials. Run `npm test` and you'll see a report on passing and failing tests.

`secrets.js` format: 
```
module.exports = {
	facebook: {
    clientID: '<YOUR FACEBOOK CLIENT APP ID>',
    clientSecret: '<YOUR FACEBOOK CLIENT APP CLIENT SECRET>'
  },

  instagram: {
    clientID: '<YOUR INSTAGRAM CLIENT APP ID>',
    clientSecret: '<YOUR INSTAGRAM CLIENT APP SECRET>',
    accessToken: '<YOUR INSTAGRAM CLIENT APP ACCESS TOKEN>'
  },

  twitter: {
    consumerKey: '<YOUR TWITTER CLIENT APP KEY>',
    consumerSecret: '<YOUR TWITTER CLIENT APP SECRET>'
  },

  twitterValid: {
    userId: '<A VALID TWITTER USER ID>',
    screenName: '<TWITTER USER'S SCREEN NAME>',
    accessToken: '<VALID ACCESS TOKEN FOR TWITTER USER>',
    tokenSecret: '<VALID ACCESS TOKEN SECRET FOR TWITTER USER>'
  },

  facebookValid: {
    userId: '<A FACEBOOK USER ID>',
    accessToken: '<VALID ACCESS TOKEN FOR AN INDIVIDUAL FACEBOOK USER, AS FROM THE API DASHBOARD>'
  },

  instagramValid: {
    userId: '<AN INSTAGRAM USER ID>',
    accessToken: '<VALID ACCESS TOKEN FOR INSTAGRAM USER>'
  }
}
```
