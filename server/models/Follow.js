const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
  static async followUser({ followingId, followerId }) {
    const followData = {
      followingId: new ObjectId(followingId), // yang diikuti
      followerId: new ObjectId(followerId), // yang mengikuti
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const follows = database.collection("Follows");
    await follows.insertOne(followData);
    return `Success to follow wiht _id: ${followingId}`;
  }
}

module.exports = Follow;
