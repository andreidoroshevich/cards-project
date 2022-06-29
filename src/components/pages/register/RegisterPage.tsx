import React from 'react'
import {useSelector} from "react-redux";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {Link, Navigate} from "react-router-dom";
import style from '../login/LoginPage.module.css'
import {registerTC} from "../../../reducers/registerReducer";
import {PATH} from "../Pages";
import {AppRootStateType, useAppDispatch} from "../../../store/store";
import {RequestStatusType} from "../../../reducers/profileReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../../common/ErrorSnackBar";
import {validateFormErrors} from "../../../utils/error-utils";


export const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const success = useSelector<AppRootStateType, boolean>(state => state.register.success)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.profile.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            return validateFormErrors(values)
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        },
    })

    if (success) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>

                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Register</div>
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

                                        <div className={style.button}>
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.password && !formik.values.email)
                                                            || (formik.errors.password || formik.errors.email))}>
                                                Register
                                            </Button>
                                        </div>
                                        <div className={style.signUpText}>Already have an account</div>
                                        <div className={style.signUpLinkText}>
                                            <Link to={PATH.LOGIN_PAGE}>Sign In</Link>
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



