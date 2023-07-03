import { UpdateFeedbackInput } from "@/models/Model" 

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string 

export async function getFeedbacks() {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          feedbacks {
            id
            timeStamp
            verified
            productId
            comment
            rating
            storeId
          }
        }
      `,
    })
  }) 

  const { data } = await response.json() 
  const feedbacks = data?.feedbacks || [] 

  return feedbacks 
}

export async function updateFeedback(id: string, verified: boolean) {

  const input: UpdateFeedbackInput = {
    verified: verified,
  } 

  await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateFeedback($id: String!, $input: UpdateFeedbackInput!) {
          updateFeedback(id: $id, input: $input) {
            id
            timeStamp
            verified
            productId
            comment
            rating
            storeId
          }
        }
      `,
      variables: {
        id,
        input,
      }
    })
  }) 
}
