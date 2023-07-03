import { useState } from 'react'

import { Image, Link } from "@nextui-org/react"

import PageStore from '@/components/Page/PageStore/'
import PageInput from '@/components/Page/PageInput'


export default function Home() {
  const [activePage, setActivePage] = useState<string>('store')

  const handlePageChange = (page: string) => {
    setActivePage(page)
  }

  const handlePageContent = () => {
    switch (activePage) {
      case 'store':
        return <PageStore />
      case 'input':
        return <PageInput />
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
          Store
        </button>
        <button
          className={`flex-1 border-b-4 p-4 ${activePage === 'input' ? 'border-blue-700' : 'border-transparent'} p-4 transition-colors duration-300 focus:outline-none`}
          onClick={() => handlePageChange('input')}
        >
          Input
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
