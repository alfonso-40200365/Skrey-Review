const uri: string = process.env.NEXT_PUBLIC_GRAPHQL_API_URL as string

export async function getProducts(storeId: string) {
  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetProducts($storeId: String!) {
          products(storeId: $storeId) {
            id
            storeId
            name
            link
          }
        }
      `,
      variables: {
        storeId,
      },
    }),
  })

  const { data } = await response.json()
  const products = data?.products || []

  return products
}

export async function deleteProduct(productId: string, storeId: string) {
  const response = await fetch(uri, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
              mutation DeleteProduct($id: String!, $storeId: String!) {
                  deleteProduct(id: $id, storeId: $storeId) {
                      id
                      storeId
                      name
                      link
                  }
              }
          `,
          variables: {
              id: productId,
              storeId: storeId
          },
      })
  })

  const { data } = await response.json()
  const product = data.deleteProduct || []

  console.log(product)

  return product
}

