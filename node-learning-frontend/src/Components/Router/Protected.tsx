import{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Protected = (props:any) => {
    const { Component } = props;
    const Navigate = useNavigate();
    let login = sessionStorage.getItem('token');

    useEffect(() => {
        if (!login) {
            Navigate('/')
        }else{
            Navigate('/home')
        }
    }, []);

    return (
        <Component />
    )
}

export default Protected