const Follow = require("../models/Follow");

const typeDefs = `#graphql 
  # Schema
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    detailFollower: User
  }

  type User {
    _id: ID
    name: String
    email: String
  }

  # Response follow
  type ResponseFollowUser {
    message: String
  }

  type Query {
    getDataFollowers(_id: ID): [Follow]
  }

  type Mutation {
    follow(followingId: ID, followerId: ID): ResponseFollowUser
  }
`;

const resolvers = {
  Query: {
    getDataFollowers: async (parent, args) => {
      try {
        const { _id: id } = args;
        const followers = await Follow.getFollowers(id);
        return followers;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    follow: async (parent, args) => {
      try {
        const result = await Follow.followUser(args);
        return { message: result };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
