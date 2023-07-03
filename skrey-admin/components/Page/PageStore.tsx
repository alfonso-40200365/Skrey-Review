import TableStore from '../Tables/TableStore'
import ButtonStore from '../Button/ButtonStore'

const Store = ({ stores }: any) => {

    return (
        <div>
            <TableStore stores={stores} />
            <ButtonStore />
        </div>
    )
}

export default Store 