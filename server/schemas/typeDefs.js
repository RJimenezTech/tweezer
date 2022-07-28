const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    username: String
    email: String
    description: String
    url: String
    isPublic: Boolean
    notifications: [Tweet]
    tweets: [Tweet]
    followers: [User]
    following: [User]
    likes: [Tweet]
    notificationCount: Int
    tweetCount: Int
    followerCount: Int
    followingCount: Int
  }

  type Tweet {
    _id: ID
    tweet: String
    createdAt: String
    username: String
    replies: [Tweet]
    likes: [User]
    retweets: [User]
    isRetweet: Boolean
    isReply: Boolean
    mentions: [User]
    replyCount: Int
    likesCount: Int
    retweetCount: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    tweets(username: String): [Tweet]
    tweet(_id: ID!): Tweet
  }
`;
//   type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     addThought(thoughtText: String!): Thought
//     addReaction(thoughtId: ID!, reactionBody: String!): Thought
//     addFriend(friendId: ID!): User
//   }

//   type Auth {
//     token: ID!
//     user: User
//   }
module.exports = typeDefs;
