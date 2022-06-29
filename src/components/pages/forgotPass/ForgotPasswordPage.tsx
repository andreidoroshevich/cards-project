import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {Link, Navigate} from "react-router-dom";
import style from '../../common/styles/FormStyles.module.css'
import {PATH} from "../Pages";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../../common/pages/ErrorSnackBar";
import {useFormik} from "formik";
import {validateNewPassEmailFormErrors} from "../../../utils/error-utils";
import {recoveryPassTC} from "../../../reducers/forgotReducer";
import {EMAIL_TEMPLATE} from "../../../const/CONST";


export const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)
    const info = useAppSelector(state => state.forgot.info)


    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            return validateNewPassEmailFormErrors(values)
        },
        onSubmit: values => {
            dispatch(recoveryPassTC({email: values.email, message: EMAIL_TEMPLATE}))
            formik.resetForm()
        },
    })

    if (info) {
        return <Navigate to={PATH.EMAIL_CHECK_PAGE}/>
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
                                    <div className={style.field}>

                                        <FormGroup>
                                            <TextField
                                                label="Email"
                                                margin="normal"
                                                {...formik.getFieldProps('email')}
                                            />
                                            {formik.touched.email
                                                && formik.errors.email
                                                && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.email)
                                                            || (formik.errors.email))
                                                    }
                                            >
                                                SEND INSTRUCTIONS
                                            </Button>
                                            <div className={style.signUpText}> Did you remember your password?
                                            </div>
                                            <div className={style.signUpLinkText}>
                                                <Link to={PATH.LOGIN_PAGE}>Try logging in</Link>
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
