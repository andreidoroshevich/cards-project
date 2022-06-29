import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {Link, Navigate, useParams} from "react-router-dom";
import style from '../../common/styles/FormStyles.module.css'
import {setNewPassTC} from "../../../reducers/newPasswordReducer";
import {ErrorSnackbar} from "../../common/pages/ErrorSnackBar";
import {validateNewPassFormErrors} from "../../../utils/error-utils";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {PATH} from "../Pages";



export const NewPasswordPage = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)
    const isPassChanged = useAppSelector(state => state.newPassword.isPassChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            return validateNewPassFormErrors(values)
        },
        onSubmit: values => {
            token && dispatch(setNewPassTC({password: values.password, resetPasswordToken: token}))
            formik.resetForm()
        },
    })

    if (isPassChanged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>
                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Create New Password</div>
                            <form onSubmit={formik.handleSubmit}>

                                <FormControl>
                                    <div className={style.field}>

                                        <FormGroup>
                                            <TextField
                                                type="password"
                                                label="Password"
                                                margin="normal"
                                                {...formik.getFieldProps('password')}
                                            />
                                            {formik.touched.password
                                                && formik.errors.password
                                                && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                                            <TextField
                                                type="password"
                                                label="Confirm Password"
                                                margin="normal"
                                                {...formik.getFieldProps('confirmPassword')}
                                            />

                                            {formik.touched.confirmPassword
                                                && formik.errors.confirmPassword
                                                && <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}

                                            <div className={style.forgotPassword}>
                                                <Link to={'/forgot-password-page'}>Forgot Password?</Link>

                                            </div>
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.password && !formik.values.confirmPassword)
                                                            || (formik.errors.password || formik.errors.confirmPassword))}
                                                        >
                                                CREATE NEW PASSWORD
                                            </Button>
                                            <div className={style.signUpText}>Don't have an account</div>
                                            <div className={style.signUpLinkText}>
                                                <Link to={'/register-page'}>Sign Up</Link>
                                            </div>

                                        </FormGroup>
                                    </div>

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