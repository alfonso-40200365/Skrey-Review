import { Provider } from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState } from 'react'
import store from '@/redux/store'

import styles from '@/styles/globals.module.css'

import PageStoreHome from './PageStoreHome'
import PageStoreShop from './PageStoreShop'
import PageStoreCart from './PageStoreCart'
import PageStoreCategory from './PageStoreCategory'

export default function PageStore() {
    const [activePage, setActivePage] = useState<string>('home')
    const [activeCategory, setActiveCategory] = useState<string>('')

    const handlePageChange = (page: string, category?: string) => {
        setActivePage(page)
        setActiveCategory(category || '')
    }


    const handlePageContent = () => {
        switch (activePage) {
            case 'home':
                return <PageStoreHome handleCategoryClick={(category) => handlePageChange('category', category)} />
            case 'shop':
                return <PageStoreShop />
            case 'cart':
                return <PageStoreCart />
            case 'category':
                return <PageStoreCategory category={activeCategory} />
            default:
                return null
        }
    }

    return (
        <Provider store={store}>
            <div className={styles.wrapper}>
                <Navbar activePage={activePage} handlePageChange={handlePageChange} />
                {handlePageContent()}
                <Footer />
            </div>
        </Provider>
    )
}