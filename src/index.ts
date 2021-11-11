const {ApolloServer} = require('apollo-server')

import { typeDefs, resolvers } from "./resolver";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}: any) => {
    console.log(`🚀  Server ready at ${url}`);
});
