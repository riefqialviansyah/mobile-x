const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://riefqialviansyah:hhhZnACe8h0AgIZ7@kagecode.m8mbjlh.mongodb.net/?retryWrites=true&w=majority&appName=KageCode";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("x-gc1p3");

module.exports = { database };
