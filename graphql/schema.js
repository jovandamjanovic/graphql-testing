const schema = `
    type User {
        id: ID!
        email: String!
        friends: [User]
    }

    type Query {
        getUserById(id: ID!): User
        getUserByEmail(email: String!): User
        user: [User]
        friends(id: ID!): [User]
    }

    type Mutation {
        createUser(email: String!): User
        addFriend(id: ID!, friendId: ID!): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = schema;