import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {INFO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";



export const Auth: React.FC<any> = () => {
    const location = useLocation()
    const history = useNavigate()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')






    return (

        <div>
        Auth page
        </div>
    );
};

export default Auth;