import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {Link, useNavigate} from "react-router-dom";
import style from '../../common/styles/FormStyles.module.css'
import {PATH} from "../Pages";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorSnackbar from "../../common/pages/ErrorSnackBar";
import {useFormik} from "formik";
import {validateNewPassEmailFormErrors} from "../../../utils/error-utils";
import {recoveryPassTC} from "../../../reducers/forgotReducer";
import {EMAIL_TEMPLATE} from "../../../const/CONST";


const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)
    const success = useAppSelector(state => state.forgot.success)
    const navigate=useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            return validateNewPassEmailFormErrors(values)
        },
        onSubmit: values => {
            dispatch(recoveryPassTC({email: values.email, message: EMAIL_TEMPLATE}))
        },
    })

    if (success) {
        navigate(`/check-email-page/${formik.values.email}`)
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

                                          <div className={style.button}>  <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.email)
                                                            || (formik.errors.email))
                                                    }
                                            >
                                                SEND INSTRUCTIONS
                                            </Button></div>


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
export default ForgotPasswordPage
