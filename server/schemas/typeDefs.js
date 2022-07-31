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
    notifications: [Notification]
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

  type Notification {
    _id: ID
    reason: String
    userId: String
    isViewed: Boolean
    referencedUser: String
    dateCreated: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    tweets(username: String): [Tweet]
    tweet(_id: ID!): Tweet
    notifications(userId: ID): [Notification]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addTweet(userId: String!, text: String!): Tweet
    login(email: String!, password: String!): Auth
    follow(myId: String!, otherId: String!): User
    retweet(userId: String!, tweetId: String!): Tweet
    likeTweet(userId: String!, tweetId: String!): Tweet
    reply(userId: String!, text: String!, tweetId: String!): Tweet
    updateUser(userId: ID!, name: String, description: String, url: String, isPublic: Boolean): User
  }
`;

module.exports = typeDefs;
