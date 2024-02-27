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
    return `Success to follow user wiht _id: ${followingId}`;
  }

  static async getFollowers(id) {
    const follows = database.collection("Follows");
    const agg = [
      {
        $match: {
          followingId: new ObjectId("65dc9933eb30cfa01e50a510"),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "followerId",
          foreignField: "_id",
          as: "detailFollower",
        },
      },
      {
        $unwind: {
          path: "$detailFollower",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "detailFollower.password": 0,
        },
      },
    ];

    const follower = await follows.aggregate(agg).toArray();
    return follower;
  }
}

module.exports = Follow;
