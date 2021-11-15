import { gql } from 'apollo-server'
import { Resolvers } from './generated/graphql'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
    type Film {
        id: String!
        title: String!
        originalTitle: String!
        originalTitleRomanised: String!
        description: String!
        director: String!
        producer: String!
        yearReleased: Int!
        runningTime: Int!
        banner: String!
        image: String!
        rtScore: Int!
    }

    type Creator {
        name: String!
        directed: [Film!]!
        produced: [Film!]!
    }

    input CreatorFind {
        name: String
        film: String
    }

    input FilmFind {
        title: String
        director: String
        producer: String
        yearReleased: Int
    }

    type Query {
        films(find: FilmFind): [Film!]!
        directors(find: CreatorFind): [Creator!]!
        producers(find: CreatorFind): [Creator!]!
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
    Query: {
        films: (root, {find}, context) => context.dataSources.ghibliAPI.getFilms(find),
        directors: (root, {find}, {dataSources}) => dataSources.ghibliAPI.getDirectors(find),
        producers: (root, {find}, {dataSources}) => dataSources.ghibliAPI.getProducers(find),
    },
};