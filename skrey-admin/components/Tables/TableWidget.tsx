import { useState } from 'react'
import { IStore } from '@/models/Model'
import { Table, Button, Input, Popover } from '@nextui-org/react'

import { deleteStore } from '@/pages/api/Store'
import { DeleteRow } from '../Popover/PopoverDelete'

type TableStoreProps = {
    stores: IStore[]
}

export default function TableWidget({ stores }: TableStoreProps) {
    const [searchStore, setSearchStore] = useState<string>('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setSearchStore(e.target.value)
        } catch (error) {
            console.error('Failed to search stores:', error)
        }
    }

    const handleDeleteStore = async (storeId: string) => {
        try {
            await deleteStore(storeId)

        } catch (error) {
            console.error('Failed to delete store:', error)
        }
    }

    const handleDeleteConfirmation = (confirmed: boolean, storeId: string) => {
        if (confirmed) {
            handleDeleteStore(storeId)
        }
    }

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(searchStore.toLowerCase())
    )

    return (
        <section>
            <div className="flex items-center justify-between p-10 ml-80 mr-80">
                <Input
                    clearable
                    underlined
                    size="lg"
                    color="primary"
                    labelPlaceholder="Search Store"
                    onChange={handleSearch}
                />
            </div>

            <div className="md:p-12 md:mx-6">
                <Table
                    lined
                    aria-label="Table of Stores"
                    css={{ height: 'auto', width: '100%' }}
                >
                    <Table.Header>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center'}}>Name</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center'}}>Link</Table.Column>
                        <Table.Column css={{ paddingLeft: '15px', paddingRight: '15px', textAlign: 'center'}}>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body css={{ textAlign: 'center' }}>
                        {filteredStores.map((store) => (
                            <Table.Row key={store.id}>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.link}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex">
                                        <Popover>
                                            <Popover.Trigger>
                                                <Button
                                                    className="ml-2 mr-2"
                                                    bordered
                                                    auto
                                                    color="primary"
                                                    >
                                                    Select
                                                </Button>
                                            </Popover.Trigger>

                                            <Popover.Content>
                                                <DeleteRow onDelete={(confirmed: boolean) => handleDeleteConfirmation(confirmed, store.id)} />
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