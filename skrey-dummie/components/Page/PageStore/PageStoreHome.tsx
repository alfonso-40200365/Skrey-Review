import CategoryCard from './CardCategory'
import styles from '@/styles/PageHome.module.css'

type PageStoreHomeProps = {
    handleCategoryClick: (category: string) => void;
}

const PageStoreHome = ({ handleCategoryClick }: PageStoreHomeProps) => {

    const handleClick = (category: string) => {
        handleCategoryClick(category)
    }

    return (
        <main className={styles.container}>
            <div className={styles.small}>
                <CategoryCard image="https://imgur.com/uKQqsuA.png" name="Xbox" onClick={() => handleClick('xbox')} />
                <CategoryCard image="https://imgur.com/3Y1DLYC.png" name="PS5" onClick={() => handleClick('ps5')} />
                <CategoryCard image="https://imgur.com/Dm212HS.png" name="Switch" onClick={() => handleClick('switch')} />
            </div>
            <div className={styles.large}>
                <CategoryCard image="https://imgur.com/qb6IW1f.png" name="PC" onClick={() => handleClick('pc')} />
                <CategoryCard image="https://imgur.com/HsUfuRU.png" name="Accessories" onClick={() => handleClick('accessories')} />
            </div>
        </main>
    )
}

export default PageStoreHome
