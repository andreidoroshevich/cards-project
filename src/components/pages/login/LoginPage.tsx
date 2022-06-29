import React from 'react'
import {useSelector} from "react-redux";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {loginTC} from "../../../reducers/loginReducer";
import {Link, Navigate} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../../../store/store";
import {PATH} from "../Pages";
import style from '../login/LoginPage.module.css'
import {ErrorSnackbar} from "../../common/ErrorSnackBar";
import {RequestStatusType} from "../../../reducers/profileReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {validateFormErrors} from "../../../utils/error-utils";


export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginPage = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.profile.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            return validateFormErrors(values)
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE_PAGE}/>
    }

    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>
                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Sign In</div>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl>
                                    <FormGroup>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email
                                            && formik.errors.email
                                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                        <TextField type="password"
                                                   label="Password"
                                                   margin="normal"
                                                   {...formik.getFieldProps('password')}
                                        />
                                        {formik.touched.password
                                            && formik.errors.password
                                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                                        <FormControlLabel label={'Remember me'} control={<Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />}/>

                                        <div className={style.forgotPassword}>
                                            <Link to={'/forgot-password-page'}>Forgot Password?</Link>

                                        </div>
                                        <Button type={'submit'} variant={'contained'}
                                                color={'primary'}
                                                disabled={
                                                    !!((!formik.values.password && !formik.values.email)
                                                        || (formik.errors.password || formik.errors.email))}>
                                            Login
                                        </Button>
                                        <div className={style.signUpText}>Don't have an account</div>
                                        <div className={style.signUpLinkText}>
                                            <Link to={'/register-page'}>Sign Up</Link>
                                        </div>

                                    </FormGroup>
                                </FormControl>
                            </form>
                        </div>
                        <ErrorSnackbar/>
                    </Grid>
                </div>
            </Grid>

        </div>
    )
}