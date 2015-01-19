var secrets = require('../credentials/secrets.js'),
		consumerKey = secrets.twitter.consumerKey,
		consumerSecret = secrets.twitter.consumerSecret,
		baseurl = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
		;

var twitter = {
	getPosts: function (queriesObj, callback) {
		// for (var ssUserId in queriesObj) {
		// 	console.log(ssUserId);

		// }
		// return callback(null, null);
	},
	parseResponse: function (twitterResponse, callback) {
		var normalizedPosts = {};
		for (var ssUserId in twitterResponse) {
			if (twitterResponse.hasOwnProperty(ssUserId)) {
				normalizedPosts[ ssUserId ] = [];
				var length = twitterResponse[ ssUserId ].length;
				var tmp = {};
				for (var i = 0; i < length; i++) {
					var tmpPost = twitterResponse[ ssUserId ][ i ];
					tmp.postId = '';
					tmp.userId = ssUserId;
					tmp.source = {
						network: 'twitter',
						data: tmpPost
					};
					tmp.content = {
						text: tmpPost.text
					};
					tmp.permalink = 'https://twitter.com/' + tmpPost.user.screen_name + '/status/' + tmpPost.id_str;
					normalizedPosts[ ssUserId ].push(tmp);
				}
			}
		}
		return callback (null, normalizedPosts);
	}
}

var buildRequest = function (userId, callback) {
	var url = baseurl + '?screen_name=' + userId + ''
}

module.exports = twitter;
