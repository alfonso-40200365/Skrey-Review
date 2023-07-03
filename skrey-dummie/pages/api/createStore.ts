import { IStore } from "../../models/Models"

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string

export default async function CreateStore(event: any) {
    event.preventDefault()

    const data: IStore | null = {
        name: event.target[1].value,
        link: event.target[2].value
    }

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateStore($userId: String!, $input: CreateStoreInput!) {
              createStore(userId: $userId, input: $input) {
                id
                userId
                name
                link
              }
            }
          `,
          variables: {
            input: data,
            userId: event.target[0].value
          },
        }),
        next: { revalidate: 10 }
      } 

      const response = await fetch(uri, options) 
      const result = await response.json() 

      console.log(result)


      event.target[0].value = ""
      event.target[1].value = ""
      event.target[2].value = ""

}