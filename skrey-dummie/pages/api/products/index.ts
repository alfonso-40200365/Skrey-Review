import { NextApiRequest, NextApiResponse } from 'next'
import data from './data.json'

interface Product {
    id: number;
    product: string;
    category: string;
    image: string;
    price: number;
}

export function getProducts() {
    console.log('getProducts is called')
    return data as Product[]
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} is not allowed` })

    } else {
        const products = getProducts()
        res.status(200).json(products)
    }
}