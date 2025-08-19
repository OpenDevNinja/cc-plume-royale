// src/components/payments/BillingAddressForm.jsx
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../common/Input'
import Button from '../common/Button'

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Prénom requis'),
    lastName: Yup.string().required('Nom requis'),
    address: Yup.string().required('Adresse requise'),
    city: Yup.string().required('Ville requise'),
    postalCode: Yup.string().required('Code postal requis'),
    country: Yup.string().required('Pays requis')
})

const BillingAddressForm = ({ initialValues, onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Prénom"
                            name="firstName"
                            type="text"
                            required
                        />
                        <Input
                            label="Nom"
                            name="lastName"
                            type="text"
                            required
                        />
                    </div>
                    <Input
                        label="Adresse"
                        name="address"
                        type="text"
                        required
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Input
                            label="Ville"
                            name="city"
                            type="text"
                            required
                        />
                        <Input
                            label="Code postal"
                            name="postalCode"
                            type="text"
                            required
                        />
                        <Input
                            label="Pays"
                            name="country"
                            type="text"
                            required
                        />
                    </div>
                    <div className="pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isSubmitting}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default BillingAddressForm