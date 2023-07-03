import { useState } from "react" 
import { Input, Button } from "@nextui-org/react"

import CreatePurchase from "../../pages/api/createPurchase" 

export default function FormFeedback() {

    const [storeId, setStoreId] = useState("646cce1cb41d755c78ef8c9f") 
    const [productId, setProductId] = useState("647df0d075913d66d2bc86ea") 
    const [clientId, setClientId] = useState("647dc52e1f049a1efbf48d13")

    return (

        <section className="block bg-white shadow-lg rounded-lg ">
            <div className="md:p-12 md:mx-6">
                <form onSubmit={CreatePurchase} className="text-center">
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
                            labelPlaceholder="Product ID"
                            value={productId}
                            id={productId}
                            onChange={(e: any) => setProductId(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <Input
                            underlined
                            color="primary"
                            labelPlaceholder="Client ID"
                            value={clientId}
                            id={clientId}
                            onChange={(e: any) => setClientId(e.target.value)}
                        />
                    </div>

                    <div className="mb-8 text-center">
                        <Button bordered color="primary" size="lg" type="submit">
                            Add Purchase
                        </Button>
                    </div>
                </form>

            </div>
        </section>
    )
}