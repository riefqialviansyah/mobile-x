const User = require("../models/User");

const typeDefs = `#graphql
  # Schema user
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  # Login
  type ResponseLogin {
    access_token: String
  }

  input userInputLogin {
    email: String,
    password: String
  }

  # Endpoint
  type Query {
    login(userLogin: userInputLogin): ResponseLogin
    getUser(username: String): User
  }

  # Register
  input userInputRegister {
    name: String,
    username: String,
    email: String,
    password: String
  }
  
  # Endpoint
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
    getUser: async (parent, args) => {
      try {
        const { username } = args;
        const user = await User.getUserByUsername(username);
        return user;
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
