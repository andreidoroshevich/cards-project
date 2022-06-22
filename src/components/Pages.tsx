import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404Page from "./pages/Error404Page";
import NewPasswordPage from "./pages/NewPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


export const PATH = {
    FORGOT_PASSWORD_PAGE: '/forgot-password-page',
    ERROR_404_PAGE: '/error-404-page',
    LOGIN_PAGE: '/login-page',
    NEW_PASSWORD_PAGE: '/new-password-page',
    PROFILE_PAGE: '/profile-page',
    REGISTER_PAGE: '/register-page',
    TEST_PAGE: '/test-Page',
}

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN_PAGE}/>}/>
                <Route path={PATH.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage/>}/>
                <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
                <Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage/>}/>
                <Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
                <Route path={PATH.REGISTER_PAGE} element={<RegisterPage/>}/>
                <Route path={PATH.TEST_PAGE} element={<TestPage/>}/>
                <Route path={'/*'} element={<Error404Page/>}/>
            </Routes>
        </div>
    );
};

export default Pages;