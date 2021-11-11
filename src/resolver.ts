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
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String!
        author: Author!
        branch: String!
    }

    type Author {
        name: String!
    }

    type Library {
        branch: String!
        books: [Book!]
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
        book(title: String!): Book
        authors: [Author]
        libraries: [Library]
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers: Resolvers = {
    Query: {
        books: () => books.map(book => ({
            ...book,
            author: {
                name: book.author
            }
        })),
        book: (parent, args) => {
            const book = books.find(book => book.title === args.title)
            return book ? {...book, author: {name: book.author}} : null
        },
        authors: () => books.map(book => ({ name: book.author })),
        libraries: () => {
            return libraries
        }
    },
    Library: {
        books: parent => {
            return books.filter(book => book.branch === parent.branch).map(book => ({
                ...book,
                author: {
                    name: book.author
                }
            }))
        }
    }
};