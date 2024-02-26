const { database } = require("../config/mongodb");
const { hashPassword, checkPassword } = require("../helpers/hash");
const { signToken } = require("../helpers/token");

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

  static async login(inputUser) {
    const users = database.collection("Users");
    const user = await users.findOne({ email: inputUser.email });
    if (!user) throw { Error: "Invalid username/password" };
    const isValid = checkPassword(inputUser.password, user.password);
    if (!isValid) throw { Error: "Invalid username/password" };

    const access_token = signToken({ id: user._id });
    return { access_token };
  }
}

module.exports = User;
