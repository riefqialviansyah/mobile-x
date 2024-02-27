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
    userDetail: UserDetail
  }

  type UserDetail {
    name: String
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

  type responseComent {
    message: String
  }

  type Query {
    getDataPosts: [Post]
    getDataPostById(_id: ID): Post
  }

  input inputUserCreatePost {
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
  }

  type Mutation{
    createPost(inputUser: inputUserCreatePost): responseCreatePost
    createComent(content: String, postId: String): responseComent
  }
`;

const resolvers = {
  Query: {
    getDataPosts: async () => {
      try {
        const posts = await Post.getPosts();
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
    getDataPostById: async (parent, args) => {
      try {
        const { _id: id } = args;
        const post = await Post.getPostById(id);
        console.log(post);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
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
    createComent: async (parent, args, contexValue) => {
      try {
        const user = await contexValue.auth();
        const { content, postId } = args;
        const result = await Post.addComent({
          content,
          username: user.username,
          postId,
        });
        return { message: result };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
