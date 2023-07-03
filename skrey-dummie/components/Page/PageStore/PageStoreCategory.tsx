import { useState, useEffect } from 'react'
import ProductCard from './CardProduct'
import styles from '@/styles/PageStore.module.css'

interface Product {
    id: number
    product: string
    category: string
    image: string
    price: number
}

type CategoryPageProps = {
    category: string
}

const CategoryPage = ({ category }: CategoryPageProps) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/products/${category}`)
                const fetchedProducts: Product[] = await res.json()
                setProducts(fetchedProducts)

                console.log(fetchedProducts)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        if (category) {
            fetchData()
        }
    }, [category])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Results for {category}</h1>
            <div className={styles.cards}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default CategoryPage
