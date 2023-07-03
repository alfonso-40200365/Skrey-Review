import { useEffect, useState } from 'react'
import ProductCard from './CardProduct'
import styles from '@/styles/PageStore.module.css'
import { getProducts } from '@/pages/api/products'

interface Product {
  id: number
  product: string
  category: string
  image: string
  price: number
}

export default function PageStoreShop() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts: Product[] = await getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Results</h1>
      <div className={styles.cards}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
