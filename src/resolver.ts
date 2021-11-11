import { gql } from 'apollo-server'
import { Resolvers } from './generated/graphql'

const libraries = [
    {
        branch: 'downtown'
    },
    {
        branch: 'riverside'
    },
];

// The branch field of a book indicates which library has it in stock
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
        branch: 'riverside'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
        branch: 'downtown'
    },
];



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

    type Query {
        films: [Film!]!
        film(title: String!): Film
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
    Query: {
        films: (root, args, {dataSources}) => dataSources.ghibliAPI.getAllFilms(),
        film: (root, {title}, {dataSources}) => dataSources.ghibliAPI.getAFilm(title)
    },
};