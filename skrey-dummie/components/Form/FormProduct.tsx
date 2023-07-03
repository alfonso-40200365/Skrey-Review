import { useState } from "react" 
import { Input, Button } from "@nextui-org/react"

import CreateProduct from "../../pages/api/createProduct" 

export default function FormFeedback() {

    const [storeId, setStoreId] = useState("646cce1cb41d755c78ef8c9f") 
    const [name, setName] = useState("") 
    const [link, setLink] = useState("") 

    return (

        <section className="block bg-white shadow-lg rounded-lg ">
            <div className="md:p-12 md:mx-6">
                <form onSubmit={CreateProduct} className="text-center">
                    <div className="mb-8">
                        <Input
                            underlined
                            color="primary"
                            labelPlaceholder="Store ID"
                            value={storeId}
                            id={storeId}
                            onChange={(e: any) => setStoreId(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <Input
                            underlined
                            color="primary"
                            labelPlaceholder="Name"
                            value={name}
                            id={name}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <Input
                            underlined
                            color="primary"
                            labelPlaceholder="Short Name"
                            value={link}
                            id={link}
                            onChange={(e: any) => setLink(e.target.value)}
                        />
                    </div>
                    <div className="mb-8 text-center">
                        <Button bordered color="primary" size="lg" type="submit">
                            Add Product
                        </Button>
                    </div>
                </form>

            </div>
        </section>
    )
}