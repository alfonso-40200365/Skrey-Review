import { useState, useEffect } from 'react'
import { IFeedback, IStore, IProduct } from '@/models/Model'

import { Image, Link } from "@nextui-org/react"

import { getFeedbacks } from './api/Feedback'
import { getStores } from './api/Store'
import { getProducts } from './api/Product'

import PageFeedback from '@/components/Page/PageFeedback'
import PageStore from '@/components/Page/PageStore'
import PageProduct from '@/components/Page/PageProduct'
import PagePurchase from '@/components/Page/PagePurchase'
import PageEmail from '@/components/Page/PageEmail'
import PageWidget from '@/components/Page/PageWidget'


export default function Home() {
  const [activePage, setActivePage] = useState<string>('store')
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([])
  const [stores, setStores] = useState<IStore[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const feedbacksData = await getFeedbacks()
      const storesData = await getStores("admin")
      const productsData = await getProducts("")

      setFeedbacks(feedbacksData)
      setStores(storesData)
      setProducts(productsData)
    }

    //fetchData()

    const dataInterval = setInterval(fetchData, 5000)
    return () => clearInterval(dataInterval);
  }, [])

  const handlePageChange = (page: string) => {
    setActivePage(page)
  }

  const handlePageContent = () => {
    switch (activePage) {
      case 'store':
        return <PageStore stores={stores} />
      case 'product':
        return <PageProduct stores={stores} products={products} />
      case 'feedback':
        return <PageFeedback feedbacks={feedbacks} stores={stores} products={products} />
      case 'purchase':
        return <PagePurchase feedbacks={feedbacks} stores={stores} products={products} />
      case 'widget':
        return <PageWidget />
      case 'email':
        return <PageEmail />
      default:
        return null
    }
  }

  return (
    <div className="">
      <div className="bg-white shadow-lg h-24 md:flex mb-4 font-semibold lg:text-lg items-center ">
        <Link href="/" key="KeyNavbarLogo" className='m-10'>
          <Image src="/skrey.png" alt="Skrey Logo" width={130} height={130} />
        </Link>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'store' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('store')}
        >
          Stores
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'product' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('product')}
        >
          Products
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'feedback' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('feedback')}
        >
          Feedbacks
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'purchase' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('purchase')}
        >
          Purchases
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'widget' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('widget')}
        >
          Widget
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'email' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('email')}
        >
          E-mail
        </button>
      </div>
      <main className="min-h-screen items-center p-24">
        <section className="bg-white shadow-lg rounded-lg">
          {handlePageContent()}
        </section>
      </main>

    </div>
  )
}
