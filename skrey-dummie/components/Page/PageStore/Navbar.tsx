import styles from '@/styles/Navbar.module.css'
import { useSelector } from 'react-redux'

const Navbar = ({ activePage, handlePageChange }: any) => {

    const cart = useSelector((state: any) => state.cart)
    
    const getItemsCount = () => {
        return cart.reduce((accumulator: any, item: any) => accumulator + item.quantity, 0)
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <h6 className={styles.logo}>GamesKart</h6>
                <ul className={styles.links}>
                    <li className={styles.navlink}>
                        <button
                            className={`${activePage === 'home' ? 'text-orange-500  ' : 'text-black'}`}
                            onClick={() => handlePageChange('home')}>
                            Home
                        </button>
                    </li>
                    <li className={styles.navlink}>
                        <button
                            className={`${activePage === 'shop' ? 'text-orange-500  ' : 'text-black'}`}
                            onClick={() => handlePageChange('shop')}>
                            Shop
                        </button>
                    </li>
                    <li className={styles.navlink}>
                        <button
                            className={`${activePage === 'cart' ? 'text-orange-500  ' : 'text-black'}`}
                            onClick={() => handlePageChange('cart')}>
                            <p>Cart ({getItemsCount()})</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar