const { ApolloServer } = require("apollo-server");

import { GhibliAPI } from "./datasource";
import { typeDefs, resolvers } from "./resolver";

const port = process.env.PORT || "4000";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ghibliAPI: new GhibliAPI(),
  }),
  cors: {
    origin: "*",
    credentials: true,
  },
});

// The `listen` method launches a web server.
server.listen({ port }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
