import { useState } from 'react'
import { IStore, IProduct } from '@/models/Model'
import { Table, Button, Input, Dropdown, Popover } from '@nextui-org/react'

import { deleteProduct } from '@/pages/api/Product'
import { DeleteRow } from '../Popover/PopoverDelete'

type TableProductProps = {
    stores: IStore[]
    products: IProduct[]
}

export default function TableProduct({ stores, products }: TableProductProps) {
    const [selectedStore, setSelectedStore] = useState<string | null>(null)
    const [searchProduct, setSearchProduct] = useState('')

    const handleStoreChange = (store: string | null) => {
        setSelectedStore(store === 'all stores' ? null : store)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value)
    }

    const handleDeleteStore = async (productId: string, storeId: string) => {
        try {
            console.log("Delete: " + productId)
            await deleteProduct(productId, storeId)

        } catch (error) {
            console.error('Failed to delete store:', error)
        }
    }

    const handleDeleteConfirmation = (confirmed: boolean, productId: string, storeId: string) => {
        if (confirmed) {
            handleDeleteStore(productId, storeId)
        }
    }

    const filteredProducts = selectedStore
        ? products.filter(
            (product) => product.storeId === selectedStore
        )
        : products

    const searchedProducts = searchProduct
        ? filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchProduct.toLowerCase())
        )
        : filteredProducts

    return (
        <section className="block bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between p-10 ml-80 mr-80">
                <Dropdown>
                    <Dropdown.Button size="lg" flat>
                        Store
                    </Dropdown.Button>
                    <Dropdown.Menu onAction={handleStoreChange}>
                        {stores.map((store) => (
                            <Dropdown.Item key={store.id} color="default">
                                {store.name}
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Item
                            key="all stores"
                            withDivider
                            color="default"
                        >
                            All Stores
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Input
                    clearable
                    underlined
                    size="lg"
                    color="primary"
                    labelPlaceholder="Search Product"
                    onChange={handleSearch}
                />
            </div>

            <div className="md:p-12 md:mx-6">
                <Table
                    lined
                    aria-label="Table of Products"
                    css={{ height: 'auto', width: '100%' }}
                >
                    <Table.Header>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Store</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Name</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Link</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center' }}>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body css={{ textAlign: 'center' }}>
                        {searchedProducts.map((product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>
                                    {stores.find((store) => store.id === product.storeId)?.name}
                                </Table.Cell>
                                <Table.Cell css={{ padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' }}>{product.name}</Table.Cell>
                                <Table.Cell css={{ padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' }}>{product.link}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex">
                                        <Popover>
                                            <Popover.Trigger>
                                                <Button
                                                    className="ml-2 mr-2"
                                                    bordered
                                                    auto
                                                    color="error"
                                                >
                                                    Delete
                                                </Button>
                                            </Popover.Trigger>

                                            <Popover.Content>
                                                <DeleteRow onDelete={(confirmed: boolean) => handleDeleteConfirmation(confirmed, product.id, product.storeId)} />
                                            </Popover.Content>
                                        </Popover>

                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
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