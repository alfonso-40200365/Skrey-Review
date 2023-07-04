import TableWidget from "../Tables/TableWidget"

const PageWidget = ({ stores }: any) => {

    return (
        <div className="pb-10">
            <TableWidget stores={stores}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded flex ml-auto mr-auto mb-10"><a href='../api/Mail'>Create Widget!</a></button>
        </div>
    )
}

export default PageWidget