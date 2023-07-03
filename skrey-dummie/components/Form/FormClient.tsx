import { useState } from "react" 
import { Input, Button } from "@nextui-org/react"

import CreateClient from "../../pages/api/createClient" 

export default function FormFeedback() {

    const [name, setName] = useState("") 
    const [email, setEmail] = useState("") 

    return (

        <section className="block bg-white shadow-lg rounded-lg ">
            <div className="md:p-12 md:mx-6">
                <form onSubmit={CreateClient} className="text-center">
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
                            labelPlaceholder="E-mail"
                            value={email}
                            id={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-8 text-center">
                        <Button bordered color="primary" size="lg" type="submit">
                            Add Client
                        </Button>
                    </div>
                </form>

            </div>
        </section>
    )
}