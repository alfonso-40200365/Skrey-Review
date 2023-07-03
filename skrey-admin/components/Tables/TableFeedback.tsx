import { useState, useEffect } from 'react'
import { IFeedback, IStore, IProduct } from '@/models/Model'
import { Table, Button, Input, Dropdown } from '@nextui-org/react'

import { updateFeedback } from '../../pages/api/Feedback'

type TableProps = {
    feedbacks: IFeedback[],
    stores: IStore[],
    products: IProduct[],

}

export default function TableFeedback({ feedbacks, stores, products }: TableProps) {
    const [verifiedRows, setVerifiedRows] = useState<string[]>([])
    const [selectedStore, setSelectedStore] = useState<string | null>(null)
    const [searchProduct, setSearchProduct] = useState<string | null>(null)

    useEffect(() => {
        const initialVerifiedRows = feedbacks
            .filter((feedback) => !feedback.verified)
            .map((feedback) => feedback.id)

        setVerifiedRows(initialVerifiedRows)
    }, [feedbacks])

    const handleVerify = async (id: string, verified: boolean) => {
        try {
            verified = !verified

            await updateFeedback(id, verified)
            if (verifiedRows.includes(id)) {
                setVerifiedRows(verifiedRows.filter((rowId) => rowId !== id))

            } else {
                setVerifiedRows([...verifiedRows, id])
            }
        } catch (error) {
            console.error('Failed to update feedback:', error)
        }
    }

    const handleStoreChange = (store: string | null) => {
        setSelectedStore(store === "all stores" ? null : store)
    }

    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value)
    }

    const filteredFeedbacks = selectedStore
        ? feedbacks.filter((feedback) => feedback.storeId === selectedStore)
        : feedbacks

    const searchedFeedbacks = searchProduct
        ? filteredFeedbacks.filter((feedback) => {
            const product = products.find((product) => product.id === feedback.productId);
            return product && product.link.toLowerCase().includes(searchProduct);
        })
        : filteredFeedbacks;



    return (
        <section className="block bg-white shadow-lg rounded-lg ">
            <div className="flex items-center justify-between p-10 ml-80 mr-80">
                <Dropdown>
                    <Dropdown.Button size={"lg"} flat>
                        Store
                    </Dropdown.Button>
                    <Dropdown.Menu onAction={handleStoreChange}>
                        {stores.map((store) => (
                            <Dropdown.Item key={store.id} color="default">
                                {store.name}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item key="all stores" withDivider color="default">
                            All Stores
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Input
                    clearable
                    underlined
                    size='lg'
                    color='primary'
                    labelPlaceholder='Search Product'
                    onChange={handleSearchProduct} />
            </div>

            <div className="md:p-12 md:mx-6">
                <Table
                    lined
                    aria-label="Table to create Feedback"
                    disabledKeys={verifiedRows}
                    css={{ height: 'auto', width: '100%' }}
                    selectionMode="single">
                    <Table.Header>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Store</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Product</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Rating</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Comment</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Time Stamp</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Verify</Table.Column>
                    </Table.Header>

                    <Table.Body css={{ textAlign: 'center' }}>
                        {searchedFeedbacks.map((feedback) => {

                            const store = stores.find((store) => store.id === feedback.storeId)
                            const product = products.find((product) => product.id === feedback.productId)

                            return (
                                <Table.Row key={feedback.id}>
                                    <Table.Cell>{store?.name}</Table.Cell>
                                    <Table.Cell css={{ padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' }}>{product?.name}</Table.Cell>
                                    <Table.Cell>{feedback.rating}</Table.Cell>
                                    <Table.Cell css={{ padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' }}>{feedback.comment}</Table.Cell>
                                    <Table.Cell>{feedback.timeStamp.toString()}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            bordered
                                            auto
                                            color="primary"
                                            onPress={() => handleVerify(feedback.id, feedback.verified)}
                                        >
                                            Verify
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                    <Table.Pagination
                        noMargin
                        loop
                        align="center"
                        rowsPerPage={10}
                    />
                </Table>
            </div>
        </section>
    )
}
