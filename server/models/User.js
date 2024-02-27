const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashPassword, checkPassword } = require("../helpers/hash");
const { signToken } = require("../helpers/token");

class User {
  static collection() {
    return database.collection("Users");
  }

  static async register(inputUser) {
    const userCollection = this.collection();

    const newUser = {
      ...inputUser,
      password: hashPassword(inputUser.password),
    };

    const result = await userCollection.insertOne(newUser);

    return {
      _id: result.insertedId,
      ...inputUser,
    };
  }

  static async login(inputUser) {
    const userCollection = this.collection();

    const user = await userCollection.findOne({ email: inputUser.email });
    if (!user) throw new Error("Invalid username/password");

    const isValid = checkPassword(inputUser.password, user.password);
    if (!isValid) throw new Error("Invalid username/password");

    const token = signToken({ id: user._id, username: user.username });
    return { token, username: user.username };
  }

  static async getUserByUsername(username) {
    const userCollection = this.collection();

    const option = {
      projection: { password: 0 },
    };

    const user = await userCollection.findOne({ username }, option);
    if (!user) throw new Error("User not found");

    return user;
  }

  static async getUserById(id) {
    const userCollection = this.collection();

    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ];

    const profile = await userCollection.aggregate(agg).toArray();
    return profile[0];
  }
}

module.exports = User;
