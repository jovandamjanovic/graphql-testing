const hapi = require('hapi');
const mongoose = require('mongoose');
const { apolloHapi, graphiqlHapi } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const q = require('q');

const User = require('./user_model');

const graphqlSchema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');

const server = new hapi.Server();

server.connection({
    port: process.env.PORT || 4000
});

mongoose.Promise = q.Promise;

mongoose.connect(process.env.MONGODB, {
    useMongoClient: true
});

const executableSchema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers({ User }),
});

server.register([{
  register: apolloHapi,
  options: {
    path: '/graphql',
    apolloOptions: () => ({
      pretty: true,
      schema: executableSchema,
    }),
  },
}, {
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
}]);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
