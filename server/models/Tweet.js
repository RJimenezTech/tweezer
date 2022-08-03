const { NoFragmentCyclesRule } = require('graphql');
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const tweetSchema = new Schema(
  {
    text: {
      type: String,
      required: 'You need to leave a Tweet!',
      minlength: 1,
      maxlength: 280
    },
    // media: {
    //   type: String, 
    //   filesize?
    //   extension requirements?
    // },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String, 
      required: true,
    },
    name: {
      type: String,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
      }
    ],
    likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    retweets: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    isRetweet: {
        type: Boolean,
        default: false 
    }, 
    isReply: {
        type: Boolean,
        default: false
    }, 
    mentions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

tweetSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

tweetSchema.virtual('likesCount').get(function() {
    return this.likes.length;
});

tweetSchema.virtual('retweetCount').get(function() {
  return this.retweets.length;
});

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;
