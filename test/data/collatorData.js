var secrets = require('../../credentials/secrets.js');

var collatorData = {
  testPosts: {
    twitter: {
      'f5ln1svr7ff15y8t': {
        twitter: {
          last: '556548177747542017',
            posts: [
            { postId: '555732376815693824',
              userId: 'foo',
              source:
               { network: 'twitter',
                 data:
                  { created_at: 'Thu Jan 15 14:24:58 +0000 2015',
                    id: 555732376815693800,
                    id_str: '555732376815693824',
                    text: 'Hm. I might need a slightly more exciting life, if those are the highlights.',
                    source: '<a href="http://tapbots.com/software/tweetbot/mac" rel="nofollow">Tweetbot for Mac</a>',
                    truncated: false,
                    in_reply_to_status_id: null,
                    in_reply_to_status_id_str: null,
                    in_reply_to_user_id: null,
                    in_reply_to_user_id_str: null,
                    in_reply_to_screen_name: null,
                    user: [Object],
                    geo: null,
                    coordinates: null,
                    place: [Object],
                    contributors: null,
                    retweet_count: 0,
                    favorite_count: 0,
                    entities: [Object],
                    favorited: false,
                    retweeted: false,
                    lang: 'en' } },
              content: { text: 'Hm. I might need a slightly more exciting life, if those are the highlights.' },
              permalink: 'https://twitter.com/ArneHeggestad/status/555732376815693824' }, 
              { postId: '556548177747542017',
                userId: 'foo',
                source:
                 { network: 'twitter',
                   data:
                    { created_at: 'Sat Jan 17 20:26:40 +0000 2015',
                      id: 556548177747542000,
                      id_str: '556548177747542017',
                      text: '@AshesandGhostFF Yes. I’m more partial to Manhattans, because bourbon.',
                      source: '<a href="http://tapbots.com/tweetbot" rel="nofollow">Tweetbot for iΟS</a>',
                      truncated: false,
                      in_reply_to_status_id: 556540431219970050,
                      in_reply_to_status_id_str: '556540431219970048',
                      in_reply_to_user_id: 6862012,
                      in_reply_to_user_id_str: '6862012',
                      in_reply_to_screen_name: 'AshesandGhostFF',
                      user: [Object],
                      geo: null,
                      coordinates: null,
                      place: [Object],
                      contributors: null,
                      retweet_count: 0,
                      favorite_count: 0,
                      entities: [Object],
                      favorited: false,
                      retweeted: false,
                      lang: 'en' } },
                content: { text: '@AshesandGhostFF Yes. I’m more partial to Manhattans, because bourbon.' },
                permalink: 'https://twitter.com/ArneHeggestad/status/556548177747542017'} ]
          }
        },
        'cgf5gowgdz7kwkyb': {
          twitter: {
            last: '',
            posts: [ {}, {}, {} ]
          }          
        }
      },
    facebook: null
  },
  unsortedPosts: {
    'foo': {
      posts: [{
        timestamp: '2014-12-30T07:29:23.000Z',
        content: {
          text: 'Second post'
        }
      },{
        timestamp: '2015-01-13T19:37:13.000Z',
        content: {
          text: 'First post'
        }
      }, {
        timestamp: '2014-12-25T21:52:31.000Z',
        content: {
          text: 'Third post'
        }
      }]
    }
  }
}

module.exports = collatorData;
