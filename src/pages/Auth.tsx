import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {INFO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
// @ts-ignore
import s from "./style/Auth.module.css"
import FormDialog from "../components/modals/FormDialog.tsx";


export const Auth: React.FC<any> = () => {
    const location = useLocation()
    const history = useNavigate()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        console.log('email: ' + email + ' password: ' + password)
    },[email,password])


    return (

        <div className={s.loginBlock}>
            <div className={s.loginForm}>
                <FormDialog setEmail={setEmail} setPassword={setPassword}/>
            </div>

        </div>
    );
};

export default Auth;