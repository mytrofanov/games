import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {NavLink} from "react-router-dom";
// @ts-ignore
import s from '../../pages/style/Auth.module.css'
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts.js';
import TextField from "@mui/material/TextField";

const timeout={ enter: 300, exit: 1500, }

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide timeout={{ enter: 300, exit: 1500, }} direction="up" ref={ref} {...props} />;
});

export default function LoginModal({showLogin,setShowLogin,
                                       setEmail, setPassword, click, isLoginPath}) {

    const handleClose = () => {
        setShowLogin(false);
    };

    return (
        <div>
            <Dialog
                open={showLogin}
                TransitionComponent={Transition}

                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{textAlign: 'center'}}>
                    {isLoginPath ? <span>Login</span> : <span>Register</span>}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        size={"small"}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    /><TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size={"small"}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                    <DialogContentText>
                        {isLoginPath ? <span className={s.registerNow}>Not registered? <NavLink to={REGISTRATION_ROUTE}>
                        Register now</NavLink></span> :
                            <span className={s.registerNow}>Already registered? <NavLink to={LOGIN_ROUTE}>
                        Login now</NavLink></span>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {isLoginPath ? <Button onClick={() => {

                                click()
                            }}>Login</Button> :
                            <Button onClick={() => {

                                click()
                            }}>Register</Button>
                        }
                    </DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}
