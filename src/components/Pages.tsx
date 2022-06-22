import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Error404Page from "./pages/Error404Page";
import NewPasswordPage from "./pages/NewPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";


export const PATH = {
    FORGOT_PASSWORD_PAGE: '/ForgotPasswordPage',
    ERROR_404_PAGE: '/Error404Page',
    LOGIN_PAGE: '/LoginPage',
    NEW_PASSWORD_PAGE: '/NewPasswordPage',
    PROFILE_PAGE: '/ProfilePage',
    REGISTER_PAGE: '/RegisterPage',
    TEST_PAGE: '/TestPage',
}

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN_PAGE}/>}/>
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