import { CreateStoreInput } from '@/models/Model'

const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string

export async function getStores(userId: string) {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query GetStores($userId: String!) {
                    stores(userId: $userId) {
                        id
                        userId
                        name
                        link
                    }
                }
            `,
            variables: {
                userId,
            }
        })
    })

    const { data } = await response.json()
    const stores = data?.stores || []

    return stores
}

export async function createStore(name: string, link: string) {

    const clientArgs: CreateStoreInput | null = {
        name: name,
        link: link
    }

    const response = await fetch(uri, {
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
                input: clientArgs,
                userId: "admin"
            },
        })
    })

    const { data } = await response.json()
    const store = data.createStore || []

    console.log(store)

    return store
}

export async function deleteStore(storeId: string) {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation DeleteStore($id: String!, $userId: String!) {
                    deleteStore(id: $id, userId: $userId) {
                        id
                        userId
                        name
                        link
                    }
                }
            `,
            variables: {
                id: storeId,
                userId: "admin"
            },
        })
    })

    const { data } = await response.json()
    const store = data.deleteStore || []

    console.log(store)

    return store
}
