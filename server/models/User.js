const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    description: {
      type: String,
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    isPublic: {
      type: Boolean
    },
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
      }
    ],
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ], 
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('notificationCount').get(function() {
    return this.notifications.length;
});

userSchema.virtual('tweetCount').get(function() {
    return this.tweets.length;
});

userSchema.virtual('followerCount').get(function() {
    return this.followers.length;
});

userSchema.virtual('followingCount').get(function() {
  return this.following.length;
});

const User = model('User', userSchema);

module.exports = User;
