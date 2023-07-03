import createApolloServer from "./graphql" 
import dotenv from "dotenv" 

dotenv.config() 

const port: string = process.env.PORT as string 

(async () => {
  const app = await createApolloServer() 

  app.listen(port, () => {
    console.log(`Apollo Server is running on http://localhost:${port}/graphql`) 
  }) 
})() 
