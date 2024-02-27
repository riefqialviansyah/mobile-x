const Post = require("../models/Post");

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }
  
  type responseCreatePost {
    message: String
  }

  type Query {
    post: [Post]
  }

  input inputUserCreatePost {
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
  }

  type Mutation{
    createPost(inputUser: inputUserCreatePost): responseCreatePost
  }
`;

const resolvers = {
  Mutation: {
    createPost: async (parent, args) => {
      try {
        const { inputUser } = args;
        const result = await Post.createPost(inputUser);
        return { message: result };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
