import Image from 'next/image'
import styles from '@/styles/CardCategory.module.css'

interface CategoryCardProps {
  image: string
  name: string
  onClick: () => void
}

const CategoryCard = ({ image, name, onClick }: CategoryCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <Image className={styles.image} src={image} height={700} width={1300} alt={'Category Card'} />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>SHOP NOW</p>
      </div>
    </div>
  )
}

export default CategoryCard
