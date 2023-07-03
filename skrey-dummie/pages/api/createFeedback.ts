import { IFeedback } from "../../models/Models"

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string 

export default async function CreateFeedback(event: any) {
      event.preventDefault() 
   
      const data: IFeedback | null = {
        storeId: event.target[0].value,
        productId: event.target[1].value,
        clientId: event.target[2].value,
        rating: parseInt(event.target[3].value),
        comment: event.target[4].value,
      } 

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateFeedback($input: CreateFeedbackInput!) {
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
      event.target[4].value = ""
} 