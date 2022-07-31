import { gql } from '@apollo/client';

// Get all tweets from a single user
// Requires a username as variable to query
export const QUERY_ALL_TWEETS = gql`
  query Tweets($username: String) {
    tweets(username: $username) {
      _id
      text
      userId
      username
      retweetCount
      likesCount
      replyCount
      replies {
        _id
        text
        userId
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
      createdAt
    }
  }
`;

// Requires _id from tweet as variable to query
export const QUERY_ONE_TWEET = gql`
  query Tweet($id: ID!) {
    tweet(_id: $id) {
      _id
      text
      createdAt
      userId
      replies {
        _id
        text
        userId
      }
      likes {
        _id
      }
      retweets {
        _id
      }
      replyCount
      likesCount
      retweetCount
    }
  }
`;


// export const QUERY_ALL_USERS = gql`
//   query allUsers {
//     users {
//       _id
//       name
//       username
//       email
//       description
//       url
//       isPublic
//       followingCount
//       followerCount
//       tweetCount
//       notificationCount
//   }
// `;

// Requires a username as variable for query
export const QUERY_ONE_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      name
      username
      email
      description
      url
      isPublic
      notificationCount
      tweetCount
      followerCount
      followingCount
      notifications {
        _id
        text
      }
      tweets {
        _id
        text
      }
      likes {
        likesCount
      }
      following {
        followingCount
      }
      followers {
        followerCount
      }
    }
  }
`;

// I tried to query as much as possible here. 
// There is a slightly shorter QUERY_ME_BASIC below 
export const QUERY_ME_ALL = gql`
query ME {
  me {
    _id
    name
    username
    email
    description
    url
    isPublic
    notifications {
      _id
      text
    }
    tweets {
      _id
      text
      userId
    }
    followers {
      followerCount
      followers {
        _id
        name
        username
      }
    }
    following {
      _id
      name
      username
      followingCount
      following {
        _id
        name
        username
      }
    }
    likes {
      _id
      text
      userId
    }
    notificationCount
    tweetCount
    followerCount
    followingCount
  }
}
`;


export const QUERY_ME_BASIC = gql`
  query User {
    me {
      _id
      name
      username
      email
      description
      url
      isPublic
      notificationCount
      tweetCount
      followerCount
      followingCount
      notifications {
        _id
      }
      tweets {
        _id
      }
      followers {
        followerCount
      }
      following {
        followingCount
      }
      likes {
        _id
        text
      }
    }
  }
`;