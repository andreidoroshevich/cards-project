import React from 'react'
import {useSelector} from "react-redux";
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {useFormik} from 'formik';
import {Link, Navigate} from "react-router-dom";
import style from '../login/LoginPage.module.css'
import {PATH} from "../Pages";
import {AppRootStateType, useAppDispatch} from "../../../store/store";
import {RequestStatusType} from "../../../reducers/profileReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../../common/ErrorSnackBar";
import {validateFormErrors} from "../../../utils/error-utils";
import {recoveryPassTC} from "../../../reducers/forgotReducer";


export const ForgotPasswordPage = () => {

    const dispatch = useAppDispatch()
    const success = useSelector<AppRootStateType, boolean>(state => state.register.success)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.profile.status)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            return validateFormErrors(values)
        },
        onSubmit: values => {
            // dispatch(recoveryPassTC(values))
            console.log(values)
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
                            <div className={style.formTitle}>Forgot your password?</div>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email
                                            && formik.errors.email
                                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                        <div className={style.button}>
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    // disabled={!formik.values.email || formik.errors.email}
                                            >
                                                SEND INSTRUCTIONS
                                            </Button>
                                        </div>
                                        <div className={style.signUpText}>Enter your email address and we will send you further
                                            instructions</div>
                                        <div className={style.signUpLinkText}>
                                            <Link to={PATH.LOGIN_PAGE}>Try logging in</Link>
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



