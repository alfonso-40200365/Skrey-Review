import FormFeedback from '../Form/FormFeedback'
import FormStore from '../Form/FormStore'
import FormProduct from '../Form/FormProduct'
import FormClient from '../Form/FormClient'
import FormPurchase from '../Form/FormPurchase'

export default function PageInput() {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h2 className="text-2xl font-semibold mb-8 mt-12">Review Form</h2>
                <FormFeedback />

                <h2 className="text-2xl font-semibold mb-8 mt-12">Store Form</h2>
                <FormStore />

                <h2 className="text-2xl font-semibold mb-8 mt-12">Product Form</h2>
                <FormProduct />

                <h2 className="text-2xl font-semibold mb-8 mt-12">Client Form</h2>
                <FormClient />

                <h2 className="text-2xl font-semibold mb-8 mt-12">Purchase Form</h2>
                <FormPurchase />
            </main>
        </div>
    )
}