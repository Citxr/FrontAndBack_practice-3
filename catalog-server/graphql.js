const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, 'products.json');

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        price: Float!
        description: String
        categories: [String!]!
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }
`;

const resolvers = {
    Query: {
        products: () => {
            const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
            return products;
        },
        product: (_, { id }) => {
            const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
            return products.find(p => p.id === parseInt(id));
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
});