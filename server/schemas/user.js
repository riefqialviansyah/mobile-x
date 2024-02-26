const User = require("../models/User");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type ResponseLogin {
    access_token: String
  }

  input userInputLogin {
    email: String,
    password: String
  }

  type Query {
    login(userLogin: userInputLogin): ResponseLogin
  }

  input userInputRegister {
    name: String,
    username: String,
    email: String,
    password: String
  }

  type Mutation {
    register(userRegister: userInputRegister): User
  }
`;

const resolvers = {
  Query: {
    login: async (parent, args) => {
      try {
        const { userLogin } = args;
        const access_token = await User.login(userLogin);
        return access_token;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (parent, args) => {
      try {
        const { userRegister } = args;
        const user = await User.register(userRegister);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
