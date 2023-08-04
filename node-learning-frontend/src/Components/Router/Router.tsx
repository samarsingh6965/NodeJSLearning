import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../Auth/Login/Login';
import Register from '../../Auth/Register/Register';
import Home from '../Home/Home';
interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}
export default Router;