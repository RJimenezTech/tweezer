const { User, Tweet } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("tweets")
          .populate("followers")
          .populate("following")
          .populate("likes")
          .populate("notifications");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
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
    // add context to get the logged in user's info
    follow: async(parent, args) => {
      const {myId, otherId} = args;
      // push the other user to my followers array
      const myUser = await User.findByIdAndUpdate(
        {_id: myId},
        {$push: {following: otherId}},
        {new: true, runValidators: true}
      ).populate("followers");
        console.log(myUser);
      // push myself to other user's following array
      const otherUser = await User.findByIdAndUpdate(
        {_id: otherId},
        {$push: {followers: myId}},
        {new: true}
      );
      return myUser.following;
    },
    retweet: async (parent, args) => {
      // args come from the typeDefs
      const {userId, tweetId} = args;
      const user = await User.findById(
        {
        _id: userId
        })
      
      await Tweet.findByIdAndUpdate(
        {_id: tweetId},
        {$push: {retweets: userId}},
        {new: true}
      )

      if (user) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { tweets: tweetId } },
          { new: true }
        );
          
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    likeTweet: async (parent, args) => {
      // args come from the typeDefs
      const {userId, tweetId} = args;
      const user = await User.findById(
        {
        _id: userId
        })
      
      await Tweet.findByIdAndUpdate(
        {_id: tweetId},
        {$push: {likes: userId}},
        {new: true}
      )

      if (user) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { likes: tweetId } },
          { new: true }
        );
          
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    //notifyUser
    //reply
    //updateUser
    //deleteTweet
    //deleteFollower
    //deleteFollowing 
    //changePrivacy
    //deleteAccount?
  },
};

module.exports = resolvers;
