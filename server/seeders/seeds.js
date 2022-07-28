const faker = require("faker");

const db = require("../config/connection");
const { Tweet, User } = require("../models");

db.once("open", async () => {
  await Tweet.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let followerId = userId;

    while (followerId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      followerId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
  }

  // create tweets
  let createdtweets = [];
  for (let i = 0; i < 100; i += 1) {
    const text = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdtweet = await Tweet.create({ text, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { tweets: createdtweet._id } }
    );

    createdtweets.push(createdtweet);
  }

//   // create reactions
//   for (let i = 0; i < 100; i += 1) {
//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomtweetIndex = Math.floor(
//       Math.random() * createdtweets.length
//     );
//     const { _id: tweetId } = createdtweets[randomtweetIndex];

//     await tweet.updateOne(
//       { _id: tweetId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
//     );
//   }

  console.log("all done!");
  process.exit(0);
});
