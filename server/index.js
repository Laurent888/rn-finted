const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');
const { verifyToken } = require('./utils/auth');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database is connected'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    const token = ctx.req.headers.authorization.split(' ')[1];
    console.log('IN SERVER TOKEN:', token ? 'YES' : 'NO');
    const user = await verifyToken(token);

    console.log('In Server context: ', user ? user.username : 'NO USER');

    return {
      user,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server started on ${url}`);
});
