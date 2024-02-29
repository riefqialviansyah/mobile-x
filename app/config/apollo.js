import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://34ee-110-136-217-80.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default client;
