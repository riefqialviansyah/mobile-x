const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static collection() {
    return database.collection("Posts");
  }
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

  static async getPosts() {
    const posts = database.collection("Posts");

    const agg = [
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "userDetail",
        },
      },
      {
        $unwind: {
          path: "$userDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "userDetail.password": 0,
          "userDetail._id": 0,
          "userDetail.username": 0,
          "userDetail.email": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const allPosts = await posts.aggregate(agg).toArray();
    console.log(allPosts);
    return allPosts;
  }

  static async getPostById(id) {
    const posts = database.collection("Posts");
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "userDetail",
        },
      },
      {
        $unwind: {
          path: "$userDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "userDetail.password": 0,
          "userDetail._id": 0,
          "userDetail.username": 0,
          "userDetail.email": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const post = await posts.aggregate(agg).toArray();
    return post[0];
  }

  static async addComent({ content, username, postId }) {
    const posts = database.collection("Posts");
    const newComent = {
      content,
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await posts.updateOne(
      { _id: new ObjectId(String(postId)) },
      { $addToSet: { comments: newComent } }
    );
    return "Success create coment";
  }

  static async addLike({ username, postId }) {
    const posts = database.collection("Posts");

    const post = await posts.find({ _id: new ObjectId(postId) }).toArray();
    const { likes } = post[0];

    const hasLike = likes.filter((el) => el.username == username);
    if (hasLike) throw new Error("You just allow to like once per post");

    const newLike = {
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await posts.updateOne(
      { _id: new ObjectId(String(postId)) },
      { $addToSet: { likes: newLike } }
    );

    return "Success like this post";
  }
}

module.exports = Post;
