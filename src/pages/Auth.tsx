import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {ANALYTICS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import s from "./style/Auth.module.css"
import FormDialog from "../components/modals/FormDialog.tsx";
import {login, registration} from "../http/userAPI.ts";
import Spinner from '../components/Spinner.tsx'

export const Auth: React.FC<any> = () => {
    const location = useLocation()
    const history = useNavigate()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [loading, setLoading] = useState(false);
    let [user, setUser] = useState({
        id: 0,
        email: '',
        password: ''
    })

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
    }

    const click = async () => {
        setLoading(true)
        try {
            let data;
            if (isLoginPath) {
                await login(email, password)
                    .then(async data => {
                            console.log('loginData:', data)
                            console.log('loginData.EMAIL:', data.email)
                            console.log('useStateEmail:', email)
                            if (data !== undefined && data.email === email && data.id) {
                                setUser(data)
                                    history(ANALYTICS_ROUTE)
                            }
                        }
                    )
            } else {
                await registration(email, password).then(data => {
                    console.log('regData: ', data)
                    if (data !== undefined && data.email === email && data.id) {
                        setUser(data)
                        console.log('Новый пользователь с адресом: ' + data.email + ' зарегистрирован!')
                        history(ANALYTICS_ROUTE)
                    }
                })

            }
        } catch (e) {
            console.log(e)
        }
    }


    return (

        <div className={s.loginBlock}>
            <div className={s.loginForm}>
                <FormDialog setEmail={setEmail}
                            setPassword={setPassword}
                            click={click}
                            isLoginPath={isLoginPath}/>
            </div>

        </div>
    );
};

export default Auth;