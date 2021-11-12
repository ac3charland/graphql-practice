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

    type Query {
        films: [Film!]!
        film(title: String!): Film
        directors(find: CreatorFind): [Creator!]!
        directorByName(name: String): Creator
        directorByFilm(title: String): Creator
        producers: [Creator!]!
        producerByName(name: String): Creator
        producerByFilm(title: String): Creator
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
    Query: {
        films: (root, args, context) => context.dataSources.ghibliAPI.getAllFilms(),
        film: (root, {title}, {dataSources}) => dataSources.ghibliAPI.getAFilm(title),
        directors: (root, args, {dataSources}) => dataSources.ghibliAPI.getDirectors(),
        directorByName: (root, {name}, {dataSources}) => dataSources.ghibliAPI.getADirectorByName(name),
        directorByFilm: (root, {title}, {dataSources}) => dataSources.ghibliAPI.getADirectorByFilm(title),
        producers: (root, args, {dataSources}) => dataSources.ghibliAPI.getAllProducers(),
        producerByName: (root, {name}, {dataSources}) => dataSources.ghibliAPI.getAProducerByName(name),
        producerByFilm: (root, {title}, {dataSources}) => dataSources.ghibliAPI.getAProducerByName(title),
    },
};