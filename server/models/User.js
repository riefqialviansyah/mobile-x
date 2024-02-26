const { database } = require("../config/mongodb");
const { hashPassword } = require("../helpers/hash");

class User {
  static async register(inputUser) {
    const users = database.collection("Users");
    const newUser = {
      ...inputUser,
      password: hashPassword(inputUser.password),
    };
    const result = await users.insertOne(newUser);
    return {
      _id: result.insertedId,
      ...inputUser,
    };
  }
}

module.exports = User;
