const User = require("../models/User");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    getUser: [User]
  }

  input userInputRegister {
    name: String,
    username: String,
    email: String,
    password: String
  }

  type Mutation {
    register(userRegister:userInputRegister): User
  }
`;

const resolvers = {
  Mutation: {
    register: async (parent, args) => {
      try {
        const { userRegister } = args;
        const user = await User.register(userRegister);
        console.log(user);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
