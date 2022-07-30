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
    text: String
    createdAt: String
    userId: String
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

  type Mutation {
    addUser(username:String!,email:String!,password:String!): User
    addTweet(userId: String!, text: String!): Tweet
    login(email: String!, password: String!): Auth
    follow(myId: String!, otherId: String!): [User]
    retweet(userId: String!, tweetId: String!): Tweet
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
