const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');


async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
      id: 1,
      name: Leanne Graham,
      username: Bret,
      email: Sincere@april.biz,
      phone: 1-770-736-8031 x56442,
      website: hildegard.org,
    }


    type Todo {
      id: ID!
      title:String!
      completed: Boolean
    }

    type Query {
        getTodos:[Todo]
    }
    `,
    resolvers: {
      Query: {
        getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos/')).data
      }
    }
  })

  app.use(bodyParser.json());
  app.use(cors())

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("server started"))
}
startServer();