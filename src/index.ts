import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { GhibliAPI } from "./datasource.js";
import { typeDefs, resolvers } from "./resolver.js";

const port: number = parseInt(process.env.PORT || "") || 4000;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.token as string;
    const { cache } = server;
    return {
      token,
      dataSources: { ghibliAPI: new GhibliAPI({ cache, token }) },
    };
  },
  listen: { port },
});
console.log(`🚀  Server ready at ${url}`);
