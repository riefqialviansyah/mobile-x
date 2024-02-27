const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static collection() {
    return database.collection("Posts");
  }

  static async createPost({ content, tags, imgUrl, authorId }) {
    const postsCollection = this.collection();

    const newPost = {
      content,
      tags,
      imgUrl,
      authorId: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
      likes: [],
    };

    const result = await postsCollection.insertOne(newPost);
    return {
      _id: result.insertedId,
      ...newPost,
    };
  }

  static async getPosts() {
    const postsCollection = this.collection();

    const agg = [
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "detailAuthor",
        },
      },
      {
        $unwind: {
          path: "$detailAuthor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "detailAuthor.password": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const posts = await postsCollection.aggregate(agg).toArray();
    return posts;
  }

  static async getPostById(id) {
    const postsCollection = this.collection();
    const agg = [
      {
        $match: {
          _id: new ObjectId("65ddf482fa3694265f009d73"),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "detailAuthor",
        },
      },
      {
        $unwind: {
          path: "$detailAuthor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "detailAuthor.password": 0,
        },
      },
    ];

    const post = await postsCollection.aggregate(agg).toArray();
    return post[0];
  }

  static async addComent({ content, username, postId }) {
    const postsCollection = this.collection();
    const newComent = {
      content,
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(String(postId)) },
      { $addToSet: { comments: newComent } }
    );
    return {
      ...newComent,
      postId,
    };
  }

  static async addLike({ username, postId }) {
    const postsCollection = this.collection();

    const post = await postsCollection
      .find({ _id: new ObjectId(String(postId)) })
      .toArray();
    let { likes } = post[0];

    if (likes.length > 0) {
      const hasLike = likes.filter((el) => el.username == username);
      const indexLike = likes.indexOf(hasLike[0]);
      if (indexLike >= 0) {
        console.log(likes, "<<<sebelum");
        likes.splice(indexLike, 1);
        console.log(likes, "<<<perubahan");
        await postsCollection.updateOne(
          { _id: new ObjectId(String(postId)) },
          { $set: { likes: likes } }
        );
        return "You unlike this post";
      }
    }

    const newLike = {
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await postsCollection.updateOne(
      { _id: new ObjectId(String(postId)) },
      { $addToSet: { likes: newLike } }
    );

    return "You like this post";
  }
}

module.exports = Post;
