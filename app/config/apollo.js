import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://db85-110-136-218-136.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default client;
