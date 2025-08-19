// src/components/auth/AuthForm.jsx
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../common/Input'
import Button from '../common/Button'

const AuthForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    submitText = 'Valider',
    children
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    {children}
                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isSubmitting}
                        >
                            {submitText}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

AuthForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default AuthForm