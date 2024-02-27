const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static async createPost({ content, tags, imgUrl, authorId }) {
    const posts = database.collection("Posts");
    const newPost = {
      content,
      tags,
      imgUrl,
      authorId: new ObjectId(authorId),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
      likes: [],
    };
    await posts.insertOne(newPost);
    return "Success create post";
  }
}

module.exports = Post;
