import TablePurchase from '../../components/Tables/TablePurchase'

const PagePurchase = ({ stores, products }: any) => {

    return (
        <div>
            <TablePurchase stores={stores} products={products} />
        </div>
    )
}

export default PagePurchase 