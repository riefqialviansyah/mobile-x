const User = require("../models/User");

const typeDefs = `#graphql
  # Schema (getUserDataByUsername, )
  type User {
    _id: ID
    name: String
    username: String
    email: String
  }

  # Schema (getUserDataByUsername, )
  type Profile {
    _id: ID
    name: String
    username: String
    email: String
    follower: [Follow]
    followerDetail: [User]
    following: [Follow]
    followingDetail: [User]
  }

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  # Login
  type Token {
    username: String
    access_token: String
  }

  # Input Login
  input loginData {
    email: String,
    password: String
  }

  # Endpoint
  type Query {
    login(loginData: loginData): Token
    getUserDataByUsername(username: String): User
    getUserDataById(_id: String): Profile
  }

  # Register
  input registerData {
    name: String,
    username: String,
    email: String,
    password: String
  }
  
  # Endpoint
  type Mutation {
    register(registerData: registerData): User
  }
`;

const resolvers = {
  Query: {
    login: async (parent, args) => {
      try {
        const { loginData } = args;

        const result = await User.login(loginData);
        return { username: result.username, access_token: result.token };
      } catch (error) {
        throw error;
      }
    },
    getUserDataByUsername: async (parent, args) => {
      try {
        const { username } = args;

        const result = await User.getUserByUsername(username);
        return result;
      } catch (error) {
        throw error;
      }
    },
    getUserDataById: async (parent, args) => {
      try {
        const { _id: id } = args;
        const user = await User.getUserById(id);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (parent, args) => {
      try {
        const { registerData } = args;

        const user = await User.register(registerData);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
