import { ApolloServer } from "apollo-server-express" 
import { resolvers } from "./resolvers" 
import { schema } from "./schemas" 
import { context } from "./context" 
import express from "express" 
import graphqlPlayground from "graphql-playground-middleware-express" 

const createApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: context,
    introspection: true,
  }) 

  await apolloServer.start() 

  const app = express() 
  apolloServer.applyMiddleware({ app }) 

  app.use("/playground", graphqlPlayground({ endpoint: "/graphql" })) 

  return app 
} 

export default createApolloServer 
