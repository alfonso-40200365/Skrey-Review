import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/cart.slice'
import styles from '@/styles/CardProduct.module.css'

const ProductCard = ({ product }: any) => {

  const dispatch = useDispatch()

  return (
    <div className={styles.card}>
      <Image src={product.image} height={300} width={220} alt={"Product Card"} />
      <h4 className={styles.title}>{product.product}</h4>
      <h5 className={styles.category}>{product.category}</h5>
      <p>€ {product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className={styles.button}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard