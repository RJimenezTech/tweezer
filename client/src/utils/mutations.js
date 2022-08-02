import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TWEET = gql`
  mutation Tweet($userId: String!, $text: String!) {
    addTweet(userId: $userId, text: $text) {
      _id
      text
      createdAt
      userId
      replies {
        _id
        text
        userId
        replyCount
      }
      likes {
        _id
        name
        username
      }
      retweets {
        _id
        name
        username
      }
      replyCount
      likesCount
      retweetCount
    }
  }
`;

// Follow
export const FOLLOW_USER = gql`
  mutation FollowUser($myId: String!, $otherId: String!) {
    follow(myId: $myId, otherId: $otherId) {
      _id
      name
      username
      followerCount
      followingCount
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUser($name: String, $userId: ID!
    $description: String, $url: String) {
    updateUser(name: $name, userId: $userId, description: $description, url: $url) {
      name
      description
      url
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation LikeTweet($userId: String!, $tweetId: String!) {
    likeTweet(userId: $userId, tweetId: $tweetId) {
      _id
      text
      userId
      likesCount
      likes {
        _id
        name
        username
      }
    }
  }
`;


export const SHARE_TWEET = gql`
  mutation Retweet($userId: String!, $tweetId: String!) {
    retweet(userId: $userId, tweetId: $tweetId) {
      _id
      text
      userId
      retweets {
        _id
        name
        username
      }
      retweetCount
    }
  }
`;
export const REPLY_TWEET = gql`
  mutation Replytweet($userId: String!, $text: String!, $tweetId: String!) {
    reply(userId: $userId, text: $text, tweetId: $tweetId) {
      _id
      text
      userId
      retweets {
        _id
        name
        username
      }
      retweetCount
    }
  }
`;
