import TableProduct from '../Tables/TableProduct'

const PageProduct = ({ stores, products }: any) => {

    return (
        <div>
            <TableProduct stores={stores} products={products} />
        </div>
    )
}

export default PageProduct 