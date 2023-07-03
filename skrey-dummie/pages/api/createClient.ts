import { IClient } from "../../models/Models"

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string

export default async function CreateClient(event: any) {
    event.preventDefault()

    const data: IClient | null = {
        name: event.target[0].value,
        email: event.target[1].value,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation CreateClient($input: CreateClientInput!) {
              createClient(input: $input) {
                id
                name
                email
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

}