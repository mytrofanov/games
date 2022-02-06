import {useContext, useState} from 'react';
import * as React from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {ANALYTICS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
// @ts-ignore
import s from "./style/Auth.module.css"
// @ts-ignore
import {login, registration} from "../http/userAPI.ts";
// @ts-ignore
import AlertDialogSlide from "../components/modals/AlertDialogSlide.tsx";
// @ts-ignore
import LoginModal from "../components/modals/LoginModal.tsx";
// @ts-ignore
import SkeletonVariants from "../components/Skeleton.tsx";
import {observer} from "mobx-react";
import {Context} from "../index.js";

export const Auth: React.FC<any> = observer(() => {
    const location = useLocation()
    const history = useNavigate()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = React.useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState('');
    // @ts-ignore
    const {user} = useContext(Context)
    const userIsOk = (data) =>{
        user.setUser(data)
        user.setIsAuth(true)
        setShowLogin(true)
        setLoading(false)
        history(ANALYTICS_ROUTE)
    }


    const click = async () => {
        setLoading(true)
        try {
            if (isLoginPath) {
                await login(email, password)
                    .then(async data => {
                            console.log('loginData:', data)
                            if (data.email === email && data.id) {
                                userIsOk(data)
                            } else {
                                setOpenAlert(true)
                                setAlertInfo('Неверные данные!')
                            }
                        }
                    )
            } else {
                await registration(email, password).then(data => {
                    console.log('RegistrationData:', data)
                    if (data.email === email && data.id) {
                        userIsOk(data)
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
                <AlertDialogSlide setOpenAlert={setOpenAlert} openAlert={openAlert} alertInfo={alertInfo}/>
            </div>
        </div>
    );
});

export default Auth;