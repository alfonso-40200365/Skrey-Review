import { useState } from "react" 
import { Input, Button } from "@nextui-org/react"

import CreateStore from "../../pages/api/createStore" 

export default function FormStore() {

    const [userId, setUserId] = useState("admin") 
    const [name, setName] = useState("") 
    const [link, setLink] = useState("") 

    return (

        <section className="block bg-white shadow-lg rounded-lg ">
            <div className="md:p-12 md:mx-6">
                <form onSubmit={CreateStore} className="text-center">
                    <div className="mb-8">
                        <Input
                            underlined
                            color="primary"
                            labelPlaceholder="User ID"
                            value={userId}
                            id={userId}
                            onChange={(e: any) => setUserId(e.target.value)}
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
                            labelPlaceholder="Website Link"
                            value={link}
                            id={link}
                            onChange={(e: any) => setLink(e.target.value)}
                        />
                    </div>

                    <div className="mb-8 text-center">
                        <Button bordered color="primary" size="lg" type="submit">
                            Add Store
                        </Button>
                    </div>
                </form>

            </div>
        </section>
    )
}