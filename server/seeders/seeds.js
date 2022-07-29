const faker = require("faker");

const db = require("../config/connection");
const { Tweet, User } = require("../models");

db.once("open", async () => {
  await Tweet.deleteMany({});
  await User.deleteMany({});

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
  // for (let i = 0; i < 100; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let followerId = userId;

  //   while (followerId === userId) {
  //     const randomUserIndex = Math.floor(
  //       Math.random() * createdUsers.ops.length
  //     );
  //     followerId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
  // }

  // create tweets
  // let createdtweets = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const text = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   const createdtweet = await Tweet.create({ text, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { tweets: createdtweet._id } }
  //   );

  //   createdtweets.push(createdtweet);
  // }

  // create following


  console.log("all done!");
  process.exit(0);
});
