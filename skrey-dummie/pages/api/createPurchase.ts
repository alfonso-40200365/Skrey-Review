import { IPurchase } from "../../models/Models"

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string 

export default async function CreatePurchase(event: any) {
      event.preventDefault() 
   
      const data: IPurchase | null = {
        clientId: event.target[0].value,
        productId: event.target[1].value,
        storeId: event.target[2].value,
        timeStamp: new Date
      } 

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreatePurchase($input: CreateFeedbackInput!) {
              createFeedback(input: $input) {
                id
                storeId
                productId
                rating
                comment
                verified
                timeStamp
              }
            }
          `,
          variables: {
            input: data,
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
      event.target[3].value = ""
}