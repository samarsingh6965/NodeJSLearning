import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../Auth/Login/Login';
import Register from '../../Auth/Register/Register';
import Home from '../Home/Home';
import Protected from './Protected';
import FormPage from '../Form/Form';
interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Protected Component={Home} />} />
            <Route path="/addCard" element={<FormPage />} />
            <Route path="/editCard/:_id" element={<FormPage/>} />
        </Routes>
    );
}
export default Router;