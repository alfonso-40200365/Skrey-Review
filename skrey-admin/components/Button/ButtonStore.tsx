import { useState } from "react"
import { Modal, Text, Input } from "@nextui-org/react"
import { createStore } from '@/pages/api/Store'

export default function ButtonStore() {
    const [visible, setVisible] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [link, setLink] = useState<string>('')

    const openModal = () => setVisible(true)
    const closeModal = () => setVisible(false)

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
    }


    const createNewStore = () => {
        createStore(name, link)
        
        setName('')
        setLink('')  

        closeModal()
    }

    return (
        <div className="pb-1">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded flex ml-auto mr-auto mb-20" onClick={openModal}>Create New Store</button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeModal} >
                <Modal.Header>
                    <Text b id="modal-title" size={18}>
                        Create new Store
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        underlined
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Name"
                        required
                        onChange={handleName} />
                    <Input
                        underlined
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Link"
                        required
                        onChange={handleLink} />
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded ml-1 mr-1" onClick={closeModal}>
                            Close
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-1 mr-1" onClick={createNewStore}>
                            Create Store
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}