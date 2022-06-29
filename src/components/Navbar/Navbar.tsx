import React from 'react';
import style from './Navbar.module.css';
import NavbarItem from "./navBarComponents/NavbarItem";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../reducers/loginReducer";
import {AppRootStateType} from "../../store/store";
import {PATH} from "../pages/Pages";
import {RequestStatusType} from "../../reducers/profileReducer";
import LinearProgress from "@mui/material/LinearProgress";


const Navbar = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.profile.status)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        // @ts-ignore
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (
        <div>
            <nav className={style.navbar}>
                <div className={style.menu}>
                    <NavbarItem item={'forgot-password-page'} title={'ForgotPassword'}/>
                    <NavbarItem item={'new-password-page'} title={'NewPassword'}/>
                    <NavbarItem item={'profile-page'} title={'Profile'}/>
                </div>
                <div onClick={logoutHandler} className={style.loginBlock}>Logout <div className={style.logoutIcon}>&#9094;</div></div>
            </nav>
            {status === 'loading' && <LinearProgress/>}
        </div>
    );
};

export default Navbar;

