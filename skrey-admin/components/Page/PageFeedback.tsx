import TableFeedback from '../../components/Tables/TableFeedback'

const PageFeedback = ({ feedbacks, stores, products }: any) => {

    return (
        <div>
            <TableFeedback feedbacks={feedbacks} stores={stores} products={products} />
        </div>
    )
}

export default PageFeedback 