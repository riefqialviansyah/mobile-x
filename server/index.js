require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schemas/follow");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, followTypeDefs, postTypeDefs],
  resolvers: [userResolvers, followResolvers, postResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
