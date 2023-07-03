import { IProduct } from "../../models/Models"

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string

export default async function CreateFeedback(event: any) {
    event.preventDefault()

    const data: IProduct | null = {
        name: event.target[1].value,
        link: event.target[2].value,
    }


    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateProduct($storeId: String!, $input: CreateProductInput!) {
              createProduct(storeId: $storeId, input: $input) {
                id
                storeId
                name
                link
              }
            }
          `,
          variables: {
            input: data,
            storeId: event.target[0].value
          },
        }),
        next: { revalidate: 10 }
      } 

      const response = await fetch(uri, options) 
      const result = await response.json() 

      console.log(response)
      console.log(result)


      event.target[0].value = ""
      event.target[1].value = ""
      event.target[2].value = ""

}