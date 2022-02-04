import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, INFO_ROUTE} from '../../utils/consts.js';

export default function FormDialog({setEmail, setPassword}) {
    const [open, setOpen] = React.useState(true);
    const location = useLocation()
    const isLoginPath = location.pathname === LOGIN_ROUTE
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>
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
                        onChange={(e)=>{setEmail(e.target.value)}}
                    /><TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    size={"small"}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                </DialogContent>
                <DialogContentText sx={{ ml: 3, fontSize:'small' }}>
                    {isLoginPath ? <span>Not registered? <NavLink to={REGISTRATION_ROUTE}>
                        Register now</NavLink></span> : <span>Already registered? <NavLink to={LOGIN_ROUTE}>
                        Login now</NavLink></span>}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {isLoginPath ? <Button onClick={handleClose}>Login</Button> :
                        <Button onClick={handleClose}>Register</Button>
                    }


                </DialogActions>
            </Dialog>
        </div>
    );
}
