import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Error404Page from "../common/Error404Page";
import NewPasswordPage from "./NewPasswordPage";
import ProfilePage from "./profile/ProfilePage";
import {RegisterPage} from "./register/RegisterPage";
import {LoginPage} from "./login/LoginPage";
import {ForgotPasswordPage} from "./forgotPass/ForgotPasswordPage";


export const PATH = {
    FORGOT_PASSWORD_PAGE: '/forgot-password-page',
    ERROR_404_PAGE: '/error-404-page',
    LOGIN_PAGE: '/',
    NEW_PASSWORD_PAGE: '/new-password-page',
    PROFILE_PAGE: '/profile-page',
    REGISTER_PAGE: '/register-page',
    TEST_PAGE: '/test-Page',
}

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
                <Route path={PATH.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage/>}/>
                <Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage/>}/>
                <Route path={PATH.REGISTER_PAGE} element={<RegisterPage/>}/>
                <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
                <Route path={'/*'} element={<Error404Page/>}/>
            </Routes>
        </div>
    );
};

export default Pages;