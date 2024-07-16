import { gql } from 'graphql-tag'
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

    input FilmFind {
        title: String
        director: String
        producer: String
        yearReleased: Int
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

    type Query {
        films(find: FilmFind, sort: String): [Film!]!
        directors(find: CreatorFind, sort: String): [Creator!]!
        producers(find: CreatorFind, sort: String): [Creator!]!
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
    Query: {
        films: (root, {find, sort}, context) => context.dataSources.ghibliAPI.getFilms(find, sort),
        directors: (root, {find, sort}, {dataSources}) => dataSources.ghibliAPI.getDirectors(find, sort),
        producers: (root, {find, sort}, {dataSources}) => dataSources.ghibliAPI.getProducers(find, sort),
    },
};