const { User, Tweet, Notification } = require("../models");
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
        .populate({path: 'tweets', options:{sort:{'createdAt':-1}}})
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
    notifications: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Notification.find(params).sort({createdAt: -1});
    }
  },
  Mutation: {
    addUser: async (parents, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email/password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticaitionError("Incorrect email/password");
      }

      const token = signToken(user);
      return { token, user };
    },
    // need context as parameter to find the currently logged in user
    addTweet: async (parent, args) => {
      const { userId, text } = args;
      const user = await User.findById({
        _id: userId,
      });

      if (user) {
        const tweet = await Tweet.create({
          text: text,
          userId: userId,
          username: user.username,
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
        myId,
        {$addToSet: {following: otherId}},
        {new: true, runValidators: true}
      ).populate("followers");
        console.log(myUser);

      // notify the user of the follow
      const notify = await Notification.create({
        reason: "follow",
        userId: otherId,
        referencedUser: myId,
      });
      console.log(notify);
      
      // push myself to other user's following array
      const otherUser = await User.findByIdAndUpdate(
        otherId,
        {$addToSet: {followers: myUser._id}},
        {new: true}
      );
      // push notification to others user's nofitication array
      await User.findByIdAndUpdate(
        otherId, 
        {$push: {notifications: notify._id }},
        {new: true}
      );
      console.log(otherUser);

      return otherUser;
    },
    retweet: async (parent, args) => {
      // args come from the typeDefs
      const {userId, tweetId} = args;
      const user = await User.findById(
        {
        _id: userId
        })
      
      const retweeted = await Tweet.findByIdAndUpdate(
        {_id: tweetId},
        {$push: {retweets: userId}},
        {new: true}
      )

      if (user) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { tweets: tweetId } },
          { new: true }
        );
          
        return retweeted;
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
      
      const likedTweet = await Tweet.findByIdAndUpdate(
        {_id: tweetId},
        {$push: {likes: userId}},
        {new: true}
      );

      if (user) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { likes: tweetId } },
          { new: true }
        );
          
        return likedTweet;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    reply: async (parent, args) => {
      // args come from the typeDefs
      const {userId, text, tweetId} = args;
        // args come from the typeDefs
      const user = await User.findById({
        _id: userId,
      });

      if (user) {
        const tweet = await Tweet.create({
          text: text,
          userId: userId,
          username: user.username,
          isReply: true
        });

        await Tweet.findByIdAndUpdate(
          { _id: tweetId },
          { $push: { replies: tweet._id } },
          { new: true }
        );
          
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { tweets: tweet._id } },
          { new: true }
        );

        return tweet;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateUser: async (parents, args) => {
      const {userId, name, description, url, isPublic} = args;
      const user = await User.findById(
        {_id: userId}
      );
      if(args.name) {
        await User.findByIdAndUpdate(
          {_id: userId},
          {name: name},
          {new: true}
        )
      }
      if(args.url) {
        await User.findByIdAndUpdate(
          {_id: userId},
          {description: description},
          {new: true}
        )
      }
      if(args.url) {
        await User.findByIdAndUpdate(
          {_id: userId},
          {url: url},
          {new: true}
        )
      }
      if(args.url) {
        await User.findByIdAndUpdate(
          {_id: userId},
          {isPublic: isPublic},
          {new: true}
        )
      }

      return user;
    }
    //deleteTweet
    //deleteFollower
    //deleteFollowing 
    //deleteAccount?
  },
};

module.exports = resolvers;
