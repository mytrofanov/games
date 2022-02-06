import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {ANALYTICS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import s from "./style/Auth.module.css"
import FormDialog from "../components/modals/FormDialog.tsx";
import {login, registration} from "../http/userAPI.ts";
import Spinner from '../components/Spinner.tsx'
import AlertDialogSlide from "../components/modals/AlertModal.tsx";
import SimpleSlide from "../components/modals/Transition.tsx";
import LoginModal from "../components/modals/LoginModal.tsx";
import SkeletonVariants from "../components/Skeleton.tsx";


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
    const [openAlert, setOpenAlert] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(true);
    const [AlertInfo, setAlertInfo] = React.useState('');

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
    }

    const click = async () => {
        setLoading(true)
        try {
            if (isLoginPath) {
                await login(email, password)
                    .then(async data => {
                            console.log('loginData:', data)
                            console.log('loginData.EMAIL:', data.email)
                            console.log('useStateEmail:', email)
                            if (data.email === email && data.id) {
                                setUser(data)
                                setLoading(false)
                                history(ANALYTICS_ROUTE)
                            }
                        }
                    )
            } else {
                await registration(email, password).then(data => {
                    if (data.email === email && data.id) {
                        setUser(data)
                        setLoading(false)
                        history(ANALYTICS_ROUTE)
                    } else {
                        setOpenAlert(true)
                        setAlertInfo('Регистрация пользователя с email: ' + data.email + ' не удалась!')
                    }
                })

            }
        } catch (e) {
            console.log(e)
        }
    }


    return (

        <div className={s.loginBlock}>
            {loading && <SkeletonVariants/>}
            <div className={s.loginForm}>

                <LoginModal showLogin={showLogin}
                            setShowLogin={setShowLogin}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            click={click}
                            isLoginPath={isLoginPath}/>
                <AlertDialogSlide setOpenAlert={setOpenAlert} openAlert={openAlert} AlertInfo={AlertInfo}/>
            </div>


        </div>
    );
};

export default Auth;