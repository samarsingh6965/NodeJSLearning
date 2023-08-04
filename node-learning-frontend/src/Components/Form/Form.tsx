import type { FC } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

interface FormPageProps { }

const FormPage: FC<FormPageProps> = () => {
    const initialValues = {
        title: '',
        description: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    const handleSubmit = (values:any, { resetForm }:any) => {
        console.log(values);
        resetForm();
    };
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Create a New Item</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Field
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 p-2 border rounded w-full"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            rows="4"
                            className="mt-1 p-2 border rounded w-full"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default FormPage;
