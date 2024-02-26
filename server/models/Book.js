const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Book {
  static async findAll() {
    try {
      const booksCollection = database.collection("books");
      const options = {
        sort: { title: 1 },
        projection: { price: 0 },
      };

      const books = await booksCollection.find({}, options).toArray();

      return books;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const booksCollection = database.collection("books");
      const book = await booksCollection.findOne({
        _id: new ObjectId(id),
      });
      return book;
    } catch (error) {
      console.log(error);
    }
  }

  static async addBook(newBook) {
    try {
      const booksCollection = database.collection("books");
      const result = await booksCollection.insertOne(newBook);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Book;
