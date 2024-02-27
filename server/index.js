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
const { verifyToken } = require("./helpers/token");
const User = require("./models/User");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, followTypeDefs, postTypeDefs],
  resolvers: [userResolvers, followResolvers, postResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      auth: async () => {
        const { authorization } = req.headers;
        if (!authorization) throw new Error("Invalid token");

        const [type, token] = authorization.split(" ");
        if (type != "Bearer") throw new Error("Invalid token");

        const decodeToken = verifyToken(token);
        if (!decodeToken.id) throw new Error("Invalid token");

        const user = await User.getUserById(decodeToken.id);
        if (!user) throw new Error("Invalid token");

        return { _id: user._id, username: user.username };
      },
    };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
