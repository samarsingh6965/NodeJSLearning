import type { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import http from '../../Services/http';
import { toast } from 'react-toastify';
import { responseType } from '../../Components/Common/Interfaces';



interface LoginProps { }

const Login: FC<LoginProps> = () => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const navigate = useNavigate()
    const handleSubmit = async (values: any) => {
        try {
            const response: responseType = await http({
                url: `/api/login`,
                method: 'post',
                data: values
            }, true);
            if (response.data?.code === 'SUCCESS_200') {
                toast.success(response?.data?.message)
                sessionStorage.setItem('token', response?.data?.data?.token)
                sessionStorage.setItem('userDetails', JSON.stringify(response?.data?.data?.user))
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error: any | unknown) {
            toast.error((error as any)?.response?.data?.message);
        }
    }
    return (
        <div className="w-full h-full flex items-center overflow-hidden">
            <div className="md:w-[60%] hidden h-full md:flex items-center justify-center">
                <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="image" className='w-[900px] h-[600px]' />
            </div>
            <div className="md:w-[40%] w-full h-full flex items-center justify-center">
                <div className="w-full mx-auto mt-8">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginFormSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="my-4">
                                <span className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                    <NavLink to="/register" className="text-blue-600">
                                        Click here
                                    </NavLink>
                                    .
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Log In
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Login;
