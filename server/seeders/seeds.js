const faker = require("faker");

const db = require("../config/connection");
const { Tweet, User, Notification } = require("../models");

db.once("open", async () => {
  await Tweet.deleteMany({});
  await User.deleteMany({});
  await Notification.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const name = faker.fake('{{name.firstName}} {{name.lastName}}')
    const username = faker.internet.userName(name);
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const description = faker.lorem.lines(2);
    const url = faker.internet.url()
    const isPublic = false;

    userData.push(
      { 
        name,
        username, 
        email, 
        password, 
        url, 
        description, 
        isPublic 
      });
  }
  const createdUsers = await User.collection.insertMany(userData);
  
  // create followers
  for (let i = 0; i < 250; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex];

    let followerId = userId;

    while (followerId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.insertedCount
      );
      followerId = createdUsers.insertedIds[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
  }

  // create following
  for (let i = 0; i < 250; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex];

    let followingId = userId;

    while (followingId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.insertedCount
      );
      followingId = createdUsers.insertedIds[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { following: followingId } });
  }

  // create tweets
  let createdTweets = [];
  for (let i = 0; i < 250; i += 1) {
    const text = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    console.log(text);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const { _id: userId} = createdUsers.insertedIds[randomUserIndex];
    console.log(userId);
    const randomUser = await User.findById(userId);
    const username = randomUser.username;
    console.log(username);
    const name = randomUser.name;
    const createdTweet = await Tweet.create({ text, userId, username, name });
    console.log(createdTweet);
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { tweets: createdTweet._id } }
    );

    createdTweets.push(createdTweet);
  }

  console.log("all done!");
  process.exit(0);
});
