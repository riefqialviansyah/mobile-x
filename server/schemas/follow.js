const Follow = require("../models/Follow");

const typeDefs = `#graphql 
  # Schema
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  # Response follow
  type ResponseFollowUser {
    message: String
  }

  type Query {
    follow: [Follow]
  }

  type Mutation {
    follow(followingId: ID, followerId: ID): ResponseFollowUser
  }
`;

const resolvers = {
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
