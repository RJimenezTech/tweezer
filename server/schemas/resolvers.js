const { User, Tweet } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     const userData = await User.findOne({ _id: context.user._id })
    //       .select("-__v -password")
    //       .populate("thoughts")
    //       .populate("friends");

    //     return userData;
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("tweets")
        .populate("followers")
        .populate("following")
        .populate("likes")
        .populate("notifications");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("tweets")
        .populate("followers")
        .populate("following")
        .populate("notifications")
        .populate("likes");
    },
    tweets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Tweet.find(params).sort({ createdAt: -1 });
    },
    tweet: async (parent, { _id }) => {
      return Tweet.findOne({ _id });
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});
      if (!user) {
        throw new AuthenticationError("Incorrect email/password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticaitionError("Incorrect email/password")
      }

      const token = signToken(user);
      return {token, user};
    },
    addUser: async (parents, args) => {
      const user = await User.create(args);
      return user;
    },    
    // need context as parameter to find the currently logged in user
    addTweet: async (parent, args) => {
      // args come from the typeDefs
      const {userId, text} = args;
      const user = await User.findById(
        {
        _id: userId
        });

      if (user) {
        const tweet = await Tweet.create({
          text: text,
          userId: userId,
        });

        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { tweets: tweet._id } },
          { new: true }
        );
          
        return tweet;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    //login
    //updateUser
    //deleteTweet
    //addFollower
    //addFollowing
    //deleteFollower
    //deleteFollowing
    //likeTweet
    //notifyUser
    //retweet
    //reply
    //changePrivacy
    //deleteAccount?
  },
};

module.exports = resolvers;
