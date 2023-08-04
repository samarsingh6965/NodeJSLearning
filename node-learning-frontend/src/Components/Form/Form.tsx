import type { FC } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { responseType } from '../Common/Interfaces';
import http from '../../Services/http';

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
    const navigate = useNavigate();

    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            const response: responseType = await http({
                url: `/api/addtask`,
                method: 'post',
                data: values
            }, false);
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message)
                setTimeout(() => {
                    navigate('/home');
                    resetForm();
                }, 2000);
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
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
